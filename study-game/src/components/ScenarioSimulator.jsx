import { useState } from "react";

export default function ScenarioSimulator({ item, onRate, onNext, index, total }) {
  const [revealed, setRevealed] = useState(false);
  const [selfRating, setSelfRating] = useState(null);

  if (!item) {
    return <p className="muted">No tactical scenarios found for this selection.</p>;
  }

  const handleReveal = () => setRevealed(true);

  const handleNext = () => {
    setRevealed(false);
    setSelfRating(null);
    onNext();
  };

  return (
    <div className="scenario">
      <p className="scenario__progress">
        Scenario {index + 1} / {total}
      </p>
      <section className="card scenario__prompt">
        <h2 className="card__title">Stakeholder question</h2>
        <p className="scenario__question">{item.question}</p>
        {!revealed ? (
          <div className="scenario__reflect">
            <label className="label" htmlFor="scenario-notes">
              Your talking points (optional)
            </label>
            <textarea
              id="scenario-notes"
              className="textarea"
              rows={5}
              placeholder="Jot how you’d open, what you’d clarify, and your main recommendation…"
            />
            <button type="button" className="btn btn--primary" onClick={handleReveal}>
              Reveal expert approach
            </button>
          </div>
        ) : (
          <div className="scenario__answer">
            <h3 className="scenario__subhead">Expert approach</h3>
            <div className="flashcard__text flashcard__answer">{item.answer}</div>
            <p className="label">How did you do?</p>
            <div className="btn-row">
              <button
                type="button"
                className={`btn ${selfRating === "strong" ? "btn--primary" : "btn--ghost"}`}
                onClick={() => {
                  setSelfRating("strong");
                  onRate?.("strong");
                }}
              >
                Strong
              </button>
              <button
                type="button"
                className={`btn ${selfRating === "ok" ? "btn--primary" : "btn--ghost"}`}
                onClick={() => {
                  setSelfRating("ok");
                  onRate?.("ok");
                }}
              >
                Okay
              </button>
              <button
                type="button"
                className={`btn ${selfRating === "weak" ? "btn--primary" : "btn--ghost"}`}
                onClick={() => {
                  setSelfRating("weak");
                  onRate?.("weak");
                }}
              >
                Needs work
              </button>
            </div>
            <button type="button" className="btn btn--primary" onClick={handleNext}>
              Next scenario
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
