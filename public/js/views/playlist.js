import { api } from '../services/api.js';

export async function renderPlaylist() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>🎵 Playlist</h1>
    <ul id="playlist"></ul>

    <h2>Adicionar Música</h2>
    <form id="formAdd">
      <input type="text" id="nome" placeholder="Nome da música" required />
      <input type="number" id="ordem" placeholder="Ordem" required />
      <button type="submit">Adicionar</button>
    </form>
  `;

  const form = document.getElementById('formAdd');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const ordem = parseInt(document.getElementById('ordem').value, 10);
    await api.addMusica({ nome, ordem });
    form.reset();
    carregar();
  });

  async function carregar() {
    const lista = await api.getPlaylist();
    const ul = document.getElementById('playlist');
    ul.innerHTML = '';
    lista.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.ordem} - ${item.nome}`;
      ul.appendChild(li);
    });
  }

  carregar();
}
