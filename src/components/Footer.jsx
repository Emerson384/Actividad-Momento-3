import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <p>© 2026 NovaFlow. Todo el valor, sin la complejidad.</p>
      <div className="footer-links">
        <Link to="/">Inicio</Link>
        <Link to="/soluciones">Soluciones</Link>
        <Link to="/favoritos">Favoritos</Link>
      </div>
    </footer>
  );
}

export default Footer;
