import api from './api';


export async function register({ name, email, password, role }) {
  const envelope = await api.post('/auth/register', { name, email, password, role });
  return envelope.data;
}

export async function login(email, password) {
  const envelope = await api.post('/auth/login', { email, password });
  return envelope.data;
}

export async function getCurrentUser() {
  const envelope = await api.get('/auth/me');
  return envelope.data;
}