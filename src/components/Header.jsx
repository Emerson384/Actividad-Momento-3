import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { favoritos } = useFavoritos();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

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

      <div className="nav-account">
        <span className="nav-user">{user?.name || user?.email}</span>
        <button type="button" className="secondary-button logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;