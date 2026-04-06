#!/usr/bin/env python3
"""Parse ADM prep markdown files into src/data/questions.json."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parents[1] / "src" / "data" / "questions.json"

FILES = {
    "technical-screen": (
        "technical_screen",
        "Technical Screen",
        ROOT / "adm-prep" / "Technical-Screen-Question-Bank.md",
        "flashcard",
    ),
    "tactical-scenarios": (
        "tactical",
        "Tactical Scenarios",
        ROOT / "adm-prep" / "Tactical-Question-Bank.md",
        "scenario",
    ),
    "technical-concepts": (
        "technical_concepts",
        "Technical Concepts",
        ROOT / "adm-prep" / "Technical-Concepts-Deep-Dive.md",
        "flashcard",
    ),
    "deployment-strategy": (
        "deployment",
        "Deployment Strategy",
        ROOT / "adm-prep" / "AI-Deployment-Manager-Prep-Guide.md",
        "flashcard",
    ),
    "cursor-product": (
        "cursor_product",
        "Cursor Product",
        ROOT / "cursor-product" / "Cursor-Product-Guide.md",
        "flashcard",
    ),
}


def clean_text(s: str) -> str:
    s = re.sub(r"\r\n?", "\n", s)
    s = re.sub(r"[ \t]+\n", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def extract_question_bank(content: str, cat_key: str, type_: str) -> list[dict]:
    items = []
    pattern = re.compile(r'\*\*Q(\d+):\s*"([^"]+)"\*\*', re.MULTILINE)
    for m in pattern.finditer(content):
        num, question = m.group(1), m.group(2)
        start = m.end()
        nxt = pattern.search(content, start)
        block = content[start:] if nxt is None else content[start : nxt.start()]
        hard = re.search(
            r"\*What makes this hard:\*\s*([^\n]+(?:\n(?!\*Approach:)[^\n]+)*)",
            block,
            re.MULTILINE,
        )
        appr = re.search(
            r"\*Approach:\*\s*([\s\S]*?)(?=\n---|\n\*\*Q\d+:|$)",
            block,
        )
        testing = re.search(
            r"\*What they're testing:\*\s*([^\n]+(?:\n(?!\*Approach:)[^\n]+)*)",
            block,
            re.MULTILINE,
        )
        parts = []
        if hard:
            parts.append("What makes this hard: " + clean_text(hard.group(1)))
        if testing:
            parts.append("What they're testing: " + clean_text(testing.group(1)))
        if appr:
            parts.append(clean_text(appr.group(1)))
        answer = "\n\n".join(parts) if parts else clean_text(block)[:4000]
        items.append(
            {
                "id": f"{cat_key}-q{num}",
                "type": type_,
                "question": clean_text(question),
                "answer": answer,
            }
        )
    return items


def extract_hash_sections(content: str, cat_key: str, skip_toc: bool = True) -> list[dict]:
    """### headings -> flashcards."""
    items = []
    parts = re.split(r"\n(?=### )", content)
    idx = 0
    for part in parts:
        if not part.startswith("### "):
            continue
        lines = part.split("\n", 1)
        title_line = lines[0][4:].strip()
        body = lines[1] if len(lines) > 1 else ""
        title_line = re.sub(r"^\d+\.\d+\s+", "", title_line)
        if skip_toc and ("Table of Contents" in part[:200] or title_line.startswith("[")):
            continue
        if len(body.strip()) < 80:
            continue
        idx += 1
        q = f"What should you know about: {title_line}?"
        items.append(
            {
                "id": f"{cat_key}-h{idx}",
                "type": "flashcard",
                "question": q,
                "answer": clean_text(body)[:8000],
            }
        )
    return items


def extract_cursor_chapters(content: str, cat_key: str) -> list[dict]:
    """## Chapter / ### subsection cards from Cursor guide."""
    items = []
    # Split on ## that starts a chapter or ###
    chunks = re.split(r"\n(?=## (?:Chapter|\[|Part)|### )", content)
    idx = 0
    for ch in chunks:
        ch = ch.strip()
        if not ch or ch.startswith("# Table") or "Table of Contents" in ch[:120]:
            continue
        if ch.startswith("## ") and "Chapter" not in ch[:40] and not ch.startswith("###"):
            # Part headers — take as one card if substantial
            if len(ch) < 100:
                continue
        title_match = re.match(r"^##\s+(.+)$", ch.split("\n")[0])
        sub_match = re.match(r"^###\s+(.+)$", ch.split("\n")[0])
        title = (title_match or sub_match).group(1).strip() if (title_match or sub_match) else None
        if not title or len(title) > 200:
            continue
        body = "\n".join(ch.split("\n")[1:]) if "\n" in ch else ""
        if len(body.strip()) < 120:
            continue
        idx += 1
        items.append(
            {
                "id": f"{cat_key}-c{idx}",
                "type": "flashcard",
                "question": f"Cursor product: {title}",
                "answer": clean_text(body)[:8000],
            }
        )
    return items


def main() -> None:
    categories = []
    for cat_id, (slug, label, path, default_type) in FILES.items():
        if not path.exists():
            raise SystemExit(f"Missing source file: {path}")
        text = path.read_text(encoding="utf-8", errors="replace")
        if slug in ("technical_screen", "tactical"):
            cards = extract_question_bank(text, slug, default_type)
        elif slug == "cursor_product":
            cards = extract_cursor_chapters(text, slug)
            if len(cards) < 5:
                cards = extract_hash_sections(text, slug, skip_toc=True)
        else:
            cards = extract_hash_sections(text, slug)
        categories.append(
            {
                "id": cat_id,
                "label": label,
                "items": cards,
            }
        )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {"version": 1, "categories": categories}
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    total = sum(len(c["items"]) for c in categories)
    print(f"Wrote {OUT} ({total} items across {len(categories)} categories)")


if __name__ == "__main__":
    main()
