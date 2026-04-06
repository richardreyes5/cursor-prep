export default function Layout({ title, children, nav, actions }) {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__header-inner">
          <h1 className="layout__title">{title}</h1>
          {actions ? <div className="layout__actions">{actions}</div> : null}
        </div>
        {nav ? <nav className="layout__nav">{nav}</nav> : null}
      </header>
      <main className="layout__main">{children}</main>
    </div>
  );
}
