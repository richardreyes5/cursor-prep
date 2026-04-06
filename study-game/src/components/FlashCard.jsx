import { useState } from "react";

export default function FlashCard({ item, flipped, onFlip, disabled }) {
  const [localFlip, setLocalFlip] = useState(false);
  const showBack = flipped ?? localFlip;

  const handleFlip = () => {
    if (disabled) return;
    if (onFlip) onFlip(!showBack);
    else setLocalFlip((f) => !f);
  };

  if (!item) {
    return (
      <div className="flashcard flashcard--empty">
        <p>No cards in this deck. Pick at least one category.</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`flashcard ${showBack ? "flashcard--back" : "flashcard--front"}`}
      onClick={handleFlip}
      aria-label={showBack ? "Show question" : "Show answer"}
    >
      <span className="flashcard__badge">{item.categoryLabel}</span>
      <div className="flashcard__body">
        {showBack ? (
          <>
            <p className="flashcard__hint">Answer</p>
            <div className="flashcard__text flashcard__answer">{item.answer}</div>
          </>
        ) : (
          <>
            <p className="flashcard__hint">Question</p>
            <div className="flashcard__text">{item.question}</div>
          </>
        )}
      </div>
      <span className="flashcard__tap">Tap to flip</span>
    </button>
  );
}
