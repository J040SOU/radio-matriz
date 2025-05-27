const BASE_URL = 'http://localhost:3000/api/playlist';

export const api = {
  async getPlaylist() {
    const res = await fetch(BASE_URL);
    return res.json();
  },
  async addMusica(data) {
    await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
};
