import api from './api';

export async function getMyIncome() {
  const envelope = await api.get('/income/me');
  return envelope.data;
}