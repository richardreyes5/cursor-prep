export default function SessionSummary({ stats, onClose, onAgain }) {
  if (!stats) return null;
  const { reviewed, gotIt, reviewAgain, xpGained } = stats;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="session-summary-title">
      <div className="modal">
        <h2 id="session-summary-title" className="modal__title">
          Session complete
        </h2>
        <ul className="summary-list">
          <li>
            <span>Cards reviewed</span> <strong>{reviewed}</strong>
          </li>
          <li>
            <span>Got it</span> <strong className="text-success">{gotIt}</strong>
          </li>
          <li>
            <span>Review again</span> <strong className="text-warning">{reviewAgain}</strong>
          </li>
          <li>
            <span>XP earned</span> <strong className="text-accent">+{xpGained}</strong>
          </li>
        </ul>
        <div className="modal__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Back to menu
          </button>
          <button type="button" className="btn btn--primary" onClick={onAgain}>
            Study again
          </button>
        </div>
      </div>
    </div>
  );
}
