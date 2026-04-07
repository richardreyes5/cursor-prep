export default function ProgressBar({ label, value, sublabel }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="progress-block">
      <div className="progress-block__top">
        <span className="progress-block__label">{label}</span>
        <span className="progress-block__value">{v}%</span>
      </div>
      <div className="progress-block__track" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-block__fill" style={{ width: `${v}%` }} />
      </div>
      {sublabel ? <p className="progress-block__sub">{sublabel}</p> : null}
    </div>
  );
}
