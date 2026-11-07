import api from './api';

export async function loginRequest(credentials) {
  const { data } = await api.post('/auth/login', credentials);
  return data;
}

export async function registerRequest(credentials) {
  const { data } = await api.post('/auth/register', credentials);
  return data;
}
