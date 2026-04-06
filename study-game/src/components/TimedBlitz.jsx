export default function TimedBlitz({ item, remaining, score, onKnow, onLearn, finished, onMenu }) {
  if (finished) {
    return (
      <div className="blitz blitz--done card">
        <h2 className="card__title">Time&apos;s up</h2>
        <p className="blitz__score">
          Rapid checks completed: <strong>{score}</strong>
        </p>
        <button type="button" className="btn btn--primary" onClick={onMenu}>
          Back to menu
        </button>
      </div>
    );
  }

  if (!item) {
    return <p className="muted">Pick categories with flashcard content to start a blitz.</p>;
  }

  return (
    <div className="blitz">
      <div className="blitz__hud">
        <span className="blitz__timer" aria-live="polite">
          {remaining}s
        </span>
        <span className="blitz__points">Score: {score}</span>
      </div>
      <section className="card">
        <h2 className="card__title">Quick check</h2>
        <p className="blitz__question">{item.question}</p>
        <div className="btn-row btn-row--stretch">
          <button type="button" className="btn btn--success" onClick={onKnow}>
            Know it
          </button>
          <button type="button" className="btn btn--warning" onClick={onLearn}>
            Still learning
          </button>
        </div>
      </section>
    </div>
  );
}

export const BLITZ_SECONDS = 60;
