import api from './api';

export async function createBooking({ gigId, bookingDate }) {
  const envelope = await api.post('/bookings', { gigId, bookingDate });
  return envelope.data.booking;
}

export async function getMyBookings() {
  const envelope = await api.get('/bookings');
  return envelope.data.bookings;
}

export async function getBooking(id) {
  const envelope = await api.get(`/bookings/${id}`);
  return envelope.data.booking;
}

export async function cancelBooking(id) {
  const envelope = await api.patch(`/bookings/${id}/cancel`);
  return envelope.data.booking;
}

export async function completeBooking(id) {
  const envelope = await api.patch(`/bookings/${id}/complete`);
  return envelope.data.booking;
}