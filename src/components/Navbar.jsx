const navItems = ['Soluciones', 'Casos de éxito', 'Precios', 'Recursos'];

function Navbar() {
  return (
    <header className="navbar">
      <div className="brand-wrap">
        <div className="brand-mark">N</div>
        <span className="brand-name">NovaFlow</span>
      </div>

      <nav className="nav-links" aria-label="Navegación principal">
        {navItems.map((item) => (
          <a key={item} href="#" className="nav-link">
            {item}
          </a>
        ))}
      </nav>

      <button type="button" className="primary-button small-button">
        Solicitar demo
      </button>
    </header>
  );
}

export default Navbar;
