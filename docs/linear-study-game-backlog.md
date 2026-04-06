# Linear — Study Game project backlog

Use this after you authenticate **Linear MCP** in Cursor (or create manually in Linear).

**Project name:** Study Game — ADM Prep  
**Description:** Gamified interview prep web app; epics match sprints below.

---

## Epic: Sprint 0 — Foundation

| Issue | Acceptance criteria |
| ----- | ------------------- |
| **Authenticate Linear MCP + create project** | Linear MCP connected in Cursor; project exists with Backlog / In Progress / Done workflow. |
| **Scaffold Vite + React at `study-game/`** | `npm install` and `npm run dev` start the app; `study-game/` committed with standard Vite React layout. |
| **Cursor Rules for study-game** | `.cursor/rules/study-game-conventions.mdc` defines React/component conventions for this repo. |

---

## Epic: Sprint 1 — Core quiz + content pipeline

| Issue | Acceptance criteria |
| ----- | ------------------- |
| **Markdown → JSON parser (5 prep docs)** | Build-time script outputs structured JSON covering all five sources; categories map to Technical Concepts, Technical Screen, Tactical, Deployment Strategy, Cursor Product. |
| **Quiz engine** | Serve questions, track answers, scoring API usable by UI modes. |
| **Flashcard mode + category picker** | Flip Q/A, self-rate Got It / Review Again; user can select one or more categories. |

---

## Epic: Sprint 2 — Game mechanics + progress

| Issue | Acceptance criteria |
| ----- | ------------------- |
| **XP, levels, streak** | Points for correct/reviewed items; level progression; daily streak in `localStorage`. |
| **Progress dashboard** | Mastery bars per category; “Needs Review” queue prioritized. |
| **Session summary** | End screen: cards reviewed, accuracy, XP earned. |
| **PR + BugBot** | Open PR for sprint-2 changes; run BugBot review; address or ticket follow-ups. |

---

## Epic: Sprint 3 — Scenario + polish

| Issue | Acceptance criteria |
| ----- | ------------------- |
| **Scenario simulator** | Tactical-style prompts; user reflects; reveal expert approach; self-rating. |
| **Timed blitz** | ~60s rapid-fire concept checks from pool. |
| **Responsive + hub link** | Usable on narrow screens; root `index.html` links to the study game. |

---

## Labels (suggested)

`study-game`, `sprint-0` … `sprint-3`, `cursor-learning`

---

## Copy-paste checklist

- [ ] Create project **Study Game — ADM Prep**
- [ ] Add 4 epics (Sprint 0–3)
- [ ] Create issues from tables above (one issue per row)
- [ ] Link issues to epics
- [ ] First issue in progress: **Scaffold Vite + React** (after MCP/project exists)
