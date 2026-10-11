import api from './api';

export async function getUsers() {
  const envelope = await api.get('/admin/users');
  return envelope.data.users;
}

export async function getUser(id) {
  const envelope = await api.get(`/admin/users/${id}`);
  return envelope.data.user;
}

export async function updateUser(id, data) {
  const envelope = await api.put(`/admin/users/${id}`, data);
  return envelope.data.user;
}

export async function deleteUser(id) {
  const envelope = await api.delete(`/admin/users/${id}`);
  return envelope.data.user;
}

export async function getAllGigs() {
  const envelope = await api.get('/admin/gigs');
  return envelope.data.gigs;
}