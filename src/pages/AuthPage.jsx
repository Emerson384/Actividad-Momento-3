import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getApiError } from '../services/api';
import { useAuth } from '../context/AuthContext';

function AuthPage() {
  const { isAuthenticated, login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const authenticate = isRegistering ? register : login;
      await authenticate({ email, password, ...(isRegistering ? { name } : {}) });
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (requestError) {
      setError(getApiError(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <Link to="/" className="brand-wrap auth-brand" aria-label="NovaFlow">
          <span className="brand-mark">N</span>
          <span className="brand-name">NovaFlow</span>
        </Link>
        <span className="subtitle">Tu operación, en un solo lugar</span>
        <h1 id="auth-title">{isRegistering ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}</h1>
        <p className="auth-description">
          {isRegistering ? 'Regístrate para comenzar a organizar tus soluciones.' : 'Inicia sesión para continuar a tu espacio de trabajo.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegistering && (
            <label>
              Nombre
              <input
                autoComplete="name"
                required
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Tu nombre"
              />
            </label>
          )}
          <label>
            Correo electrónico
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nombre@empresa.com"
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              minLength={8}
              maxLength={72}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mínimo 8 caracteres"
            />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="primary-button auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Un momento…' : isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegistering ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta?'}{' '}
          <button type="button" onClick={() => { setError(''); setIsRegistering(!isRegistering); }}>
            {isRegistering ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </section>
    </main>
  );
}

export default AuthPage;
