import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';

function Favoritos() {
  const { favoritos, toggleFavorito } = useFavoritos();

  return (
    <div className="page-container favoritos-page">
      <section className="section-header">
        <span className="subtitle">Tu Selección</span>
        <h2>Soluciones Guardadas ({favoritos.length})</h2>
      </section>

      {favoritos.length === 0 ? (
        <div className="empty-state">
          <p>Aún no has agregado ninguna solución a tus favoritos.</p>
          <Link to="/soluciones" className="btn-primary">
            Explorar Soluciones
          </Link>
        </div>
      ) : (
        <div className="cards-grid">
          {favoritos.map((item) => (
            <div key={item.id} className="card card-favorito">
              <span className="badge">{item.categoria}</span>
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
              
              <button
                type="button"
                onClick={() => toggleFavorito(item)}
                className="btn-fav active"
                aria-pressed="true"
              >
                ✕ Quitar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;