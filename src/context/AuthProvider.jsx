import { useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { loginRequest, registerRequest } from '../services/auth';

const STORAGE_KEY = 'novaflow-session';

function readSession() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const authenticate = async (request, credentials) => {
    const nextSession = await request(credentials);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  };

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: Boolean(session?.token),
      login: (credentials) => authenticate(loginRequest, credentials),
      register: (credentials) => authenticate(registerRequest, credentials),
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setSession(null);
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
