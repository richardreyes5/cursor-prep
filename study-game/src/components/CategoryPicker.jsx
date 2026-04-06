export default function CategoryPicker({ categories, selectedIds, onToggle, onSelectAll, onClear }) {
  return (
    <section className="card" aria-label="Categories">
      <div className="card__head">
        <h2 className="card__title">Categories</h2>
        <div className="card__tools">
          <button type="button" className="btn btn--ghost" onClick={onSelectAll}>
            Select all
          </button>
          <button type="button" className="btn btn--ghost" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
      <ul className="cat-list">
        {categories.map((c) => {
          const on = selectedIds.includes(c.id);
          return (
            <li key={c.id}>
              <label className="cat-row">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => onToggle(c.id)}
                />
                <span className="cat-row__label">{c.label}</span>
                <span className="cat-row__meta">{c.items.length} cards</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
