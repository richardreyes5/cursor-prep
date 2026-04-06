import ProgressBar from "./ProgressBar.jsx";

export default function Dashboard({
  streak,
  xp,
  levelInfo,
  masteryRows,
  reviewQueueLength,
  onStudyQueue,
}) {
  return (
    <div className="dashboard">
      <section className="grid-stats">
        <div className="stat-pill">
          <span className="stat-pill__label">Streak</span>
          <span className="stat-pill__value">{streak} day{streak === 1 ? "" : "s"}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill__label">Level</span>
          <span className="stat-pill__value">{levelInfo.level}</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill__label">XP</span>
          <span className="stat-pill__value">{xp}</span>
        </div>
      </section>

      <section className="card">
        <h2 className="card__title">Level progress</h2>
        <ProgressBar
          label={`To level ${levelInfo.level + 1}`}
          value={Math.round((levelInfo.current / levelInfo.needed) * 100)}
          sublabel={`${levelInfo.current} / ${levelInfo.needed} XP in this level`}
        />
      </section>

      {reviewQueueLength > 0 ? (
        <section className="card card--queue">
          <h2 className="card__title">Needs review</h2>
          <p className="muted">{reviewQueueLength} card(s) marked “Review again”.</p>
          <button type="button" className="btn btn--primary" onClick={onStudyQueue}>
            Study review queue
          </button>
        </section>
      ) : null}

      <section className="card">
        <h2 className="card__title">Mastery by category</h2>
        <p className="muted small">
          Averages how often you mark “Got it” across cards you have touched in each category.
        </p>
        <div className="mastery-list">
          {masteryRows.map((row) => (
            <ProgressBar
              key={row.id}
              label={row.label}
              value={row.pct}
              sublabel={
                row.touched
                  ? `${row.mastered} / ${row.total} cards studied`
                  : "No activity yet in this category"
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}
