import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';

function Header() {
  const { favoritos } = useFavoritos();

  return (
    <header className="navbar">
      <Link to="/" className="brand-wrap" aria-label="NovaFlow, inicio">
        <div className="brand-mark">N</div>
        <span className="brand-name">NovaFlow</span>
      </Link>

      <nav className="nav-links" aria-label="Navegación principal">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Inicio
        </NavLink>
        <NavLink to="/soluciones" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Soluciones
        </NavLink>
        <NavLink to="/favoritos" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Favoritos ({favoritos.length})
        </NavLink>
      </nav>

      <Link to="/soluciones" className="primary-button small-button">
        Ver catálogo
      </Link>
    </header>
  );
}

export default Header;