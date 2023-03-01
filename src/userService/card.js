import { httpService } from './httpService';
export async function createCard(card) {
  return await httpService.post('/cards/create-card', card);
}
export async function getAll() {
  return await httpService.get(`/cards/my_cards`);
}
export async function deleteCard(id) {
  return await httpService.delete(`/cards/${id}`);
}
export async function updateCard(id, card) {
  return await httpService.put(`/cards/${id}`, card);
}

export async function getCard(id) {
  return await httpService.get(`/cards/${id}`);
}
