import api from './api';

export async function getGigs(filters = {}) {
  const params = {};
  if (filters.category) {
    params.category = filters.category;
  }
  const envelope = await api.get('/gigs', { params });
  return envelope.data.gigs;
}

export async function getMyGigs() {
  const envelope = await api.get('/gigs', { params: { mine: true } });
  return envelope.data.gigs;
}

export async function getGig(id) {
  const envelope = await api.get(`/gigs/${id}`);
  return envelope.data.gig;
}

export async function createGig(data) {
  const envelope = await api.post('/gigs', data);
  return envelope.data.gig;
}

export async function updateGig(id, data) {
  const envelope = await api.put(`/gigs/${id}`, data);
  return envelope.data.gig;
}

export async function deleteGig(id) {
  const envelope = await api.delete(`/gigs/${id}`);
  return envelope.data.gig;
}