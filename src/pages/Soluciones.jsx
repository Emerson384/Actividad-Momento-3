import React, { useState } from 'react';
import { useFavoritos } from '../context/FavoritosContext';

// Datos de ejemplo para el catálogo de soluciones
const listaSoluciones = [
  { id: 1, titulo: 'Visibilidad Total', categoria: 'Monitoreo', descripcion: 'Centraliza procesos, prioridades y métricas para que cada equipo comprenda el estado real del negocio.' },
  { id: 2, titulo: 'Automatización con Propósito', categoria: 'Automatización', descripcion: 'Reduce tareas repetitivas con reglas inteligentes que mantienen la ejecución constante.' },
  { id: 3, titulo: 'Análisis Accionable', categoria: 'Analítica', descripcion: 'Transforma indicadores en decisiones claras con reportes visuales diseñados para líderes.' },
  { id: 4, titulo: 'Integración de Datos', categoria: 'Infraestructura', descripcion: 'Conecta tus herramientas actuales sin fricción en una sola plataforma unificada.' },
  { id: 5, titulo: 'Alertas y Seguimiento', categoria: 'Monitoreo', descripcion: 'Notificaciones en tiempo real sobre desviaciones o eventos críticos en los proyectos.' },
  { id: 6, titulo: 'Indicadores Ejecutivos', categoria: 'Analítica', descripcion: 'Dashboards directivos para medir el desempeño global de la organización.' }
];

function Soluciones() {
  // 1. Estado local para el buscador
  const [busqueda, setBusqueda] = useState('');

  // 2. Estado global consumido mediante el hook
  const { favoritos, toggleFavorito } = useFavoritos();

  // Filtrado dinámico según lo que el usuario escribe
  const solucionesFiltradas = listaSoluciones.filter((item) =>
    item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="page-container soluciones-page">
      <section className="section-header">
        <span className="subtitle">Catálogo de Servicios</span>
        <h2>Explora las soluciones de NovaFlow</h2>
        
        {/* Buscador interactivo (useState) */}
        <div className="search-bar">
          <input
            type="search"
            placeholder="Buscar solución por título o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-search"
            aria-label="Buscar soluciones por título o descripción"
          />
        </div>
      </section>

      {/* Grid de tarjetas */}
      <div className="cards-grid">
        {solucionesFiltradas.length > 0 ? (
          solucionesFiltradas.map((item) => {
            const esFavorito = favoritos.some((fav) => fav.id === item.id);
            return (
              <div key={item.id} className="card">
                <span className="badge">{item.categoria}</span>
                <h3>{item.titulo}</h3>
                <p>{item.descripcion}</p>
                
                {/* Botón para interactuar con useContext */}
                <button
                  type="button"
                  onClick={() => toggleFavorito(item)}
                  className={esFavorito ? 'btn-fav active' : 'btn-fav'}
                  aria-pressed={esFavorito}
                >
                  {esFavorito ? '★ En favoritos' : '☆ Agregar a favoritos'}
                </button>
              </div>
            );
          })
        ) : (
          <p className="no-results" role="status">
            No se encontraron soluciones con "{busqueda}".
          </p>
        )}
      </div>
    </div>
  );
}

export default Soluciones;