const BASE_PLAY = '/api/playlist';
const BASE_INT  = '/api/intervals';

export const api = {
  // PLAYLIST
  getPlaylist: () =>
    fetch(BASE_PLAY).then(r => r.json()),

  addMusica: data =>
    fetch(BASE_PLAY, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }),

  updateMusica: (id, data) =>
    fetch(`${BASE_PLAY}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }),

  deleteMusica: id =>
    fetch(`${BASE_PLAY}/${id}`, { method: 'DELETE' }),

  // INTERVALOS
  getIntervals: () =>
    fetch(BASE_INT).then(r => r.json()),

  addInterval: data =>
    fetch(BASE_INT, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }),

  updateInterval: (id, data) =>
    fetch(`${BASE_INT}/${id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }),

  deleteInterval: id =>
    fetch(`${BASE_INT}/${id}`, { method: 'DELETE' })
};
