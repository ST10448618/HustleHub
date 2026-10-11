import api from './api';

export async function getTransactions() {
  const envelope = await api.get('/transactions');
  return envelope.data.transactions;
}

export async function getTransaction(id) {
  const envelope = await api.get(`/transactions/${id}`);
  return envelope.data.transaction;
}