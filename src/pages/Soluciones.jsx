import { useEffect, useMemo, useState } from 'react';
import { useFavoritos } from '../context/FavoritosContext';
import api, { getApiError } from '../services/api';

function Soluciones() {
  const [busqueda, setBusqueda] = useState('');
  const [soluciones, setSoluciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [newSolution, setNewSolution] = useState({ titulo: '', categoria: '', descripcion: '' });
  const { favoritos, toggleFavorito } = useFavoritos();

  useEffect(() => {
    let active = true;
    api.get('/solutions')
      .then(({ data }) => {
        if (active) setSoluciones(data);
      })
      .catch((requestError) => {
        if (active) setError(getApiError(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const solucionesFiltradas = useMemo(() => soluciones.filter((item) =>
    `${item.titulo} ${item.descripcion} ${item.categoria}`.toLowerCase().includes(busqueda.toLowerCase())
  ), [soluciones, busqueda]);

  const handleCreate = async (event) => {
    event.preventDefault();
    setFormError('');
    setIsSaving(true);
    try {
      const { data } = await api.post('/solutions', newSolution);
      setSoluciones((current) => [data, ...current]);
      setNewSolution({ titulo: '', categoria: '', descripcion: '' });
    } catch (requestError) {
      setFormError(getApiError(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (solutionId) => {
    setError('');
    try {
      await api.delete(`/solutions/${solutionId}`);
      setSoluciones((current) => current.filter((item) => item.id !== solutionId));
    } catch (requestError) {
      setError(getApiError(requestError));
    }
  };

  return (
    <div className="page-container soluciones-page">
      <section className="section-header">
        <span className="subtitle">Catálogo de Servicios</span>
        <h2>Explora las soluciones de NovaFlow</h2>
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

      <form className="solution-form" onSubmit={handleCreate}>
        <div>
          <span className="subtitle">Administración</span>
          <h3>Agregar una solución</h3>
        </div>
        <label>
          Título
          <input required maxLength={100} value={newSolution.titulo} onChange={(event) => setNewSolution({ ...newSolution, titulo: event.target.value })} />
        </label>
        <label>
          Categoría
          <input required maxLength={60} value={newSolution.categoria} onChange={(event) => setNewSolution({ ...newSolution, categoria: event.target.value })} />
        </label>
        <label className="solution-description-field">
          Descripción
          <input required maxLength={500} value={newSolution.descripcion} onChange={(event) => setNewSolution({ ...newSolution, descripcion: event.target.value })} />
        </label>
        <button type="submit" className="primary-button" disabled={isSaving}>
          {isSaving ? 'Guardando…' : 'Guardar en MongoDB'}
        </button>
        {formError && <p className="form-error" role="alert">{formError}</p>}
      </form>

      {error && <p className="form-error api-error" role="alert">{error}</p>}
      {loading && <p className="loading-message" role="status">Cargando catálogo…</p>}
      <div className="cards-grid">
        {!loading && solucionesFiltradas.length > 0 ? (
          solucionesFiltradas.map((item) => {
            const esFavorito = favoritos.some((fav) => fav.id === item.id);
            return (
              <div key={item.id} className="card">
                <span className="badge">{item.categoria}</span>
                <h3>{item.titulo}</h3>
                <p>{item.descripcion}</p>
                <button
                  type="button"
                  onClick={() => toggleFavorito(item)}
                  className={esFavorito ? 'btn-fav active' : 'btn-fav'}
                  aria-pressed={esFavorito}
                >
                  {esFavorito ? '★ En favoritos' : '☆ Agregar a favoritos'}
                </button>
                <button type="button" className="delete-solution" onClick={() => handleDelete(item.id)}>
                  Eliminar solución
                </button>
              </div>
            );
          })
        ) : (!loading && !error) ? (
          <p className="no-results" role="status">
            {busqueda ? `No se encontraron soluciones con "${busqueda}".` : 'Aún no hay soluciones en el catálogo.'}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Soluciones;