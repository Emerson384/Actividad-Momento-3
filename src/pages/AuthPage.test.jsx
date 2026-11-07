import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './AuthPage';
import RutaProtegida from '../components/RutaProtegida';

const authState = vi.hoisted(() => ({ isAuthenticated: false }));
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    ...authState,
    login: vi.fn(),
    register: vi.fn(),
  }),
}));

describe('AuthPage', () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    authState.isAuthenticated = false;
  });

  it('renders the login form', () => {
    render(<MemoryRouter><AuthPage /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: 'Bienvenido de nuevo' })).toBeInTheDocument();
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument();
  });

  it('shows the registration fields when the user chooses to register', () => {
    render(<MemoryRouter><AuthPage /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Regístrate' }));

    expect(screen.getByRole('heading', { name: 'Crea tu cuenta' })).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Crear cuenta' })).toBeInTheDocument();
  });

  it('redirects unauthenticated users from protected pages to login', () => {
    render(
      <MemoryRouter initialEntries={['/privado']}>
        <Routes>
          <Route element={<RutaProtegida />}>
            <Route path="/privado" element={<p>Contenido privado</p>} />
          </Route>
          <Route path="/login" element={<p>Inicia sesión para continuar</p>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Inicia sesión para continuar')).toBeInTheDocument();
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
  });
});
