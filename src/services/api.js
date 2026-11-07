import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const session = localStorage.getItem('novaflow-session');
  if (session) {
    const { token } = JSON.parse(session);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getApiError(error) {
  return error.response?.data?.message || 'No se pudo completar la solicitud. Intenta de nuevo.';
}

export default api;
