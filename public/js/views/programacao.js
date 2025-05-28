import { api } from '../services/api.js';

export async function renderProgramacao() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>🗓 Programação</h1>
    <table border="1">
      <thead>
        <tr>
          <th>Ordem</th>
          <th>Descrição</th>
          <th>Duração (s)</th>
        </tr>
      </thead>
      <tbody id="progBody"></tbody>
    </table>
  `;

  const [musicas, intervals] = await Promise.all([
    api.getPlaylist(),
    api.getIntervals()
  ]);

  const tbody = document.getElementById('progBody');
  tbody.innerHTML = '';

  musicas.forEach(m => {
    // música
    const trMusic = document.createElement('tr');
    trMusic.innerHTML = `
      <td>${m.ordem}</td>
      <td>${m.nome}</td>
      <td>${m.durationSec}</td>
    `;
    tbody.appendChild(trMusic);

    // intervalo
    const iv = intervals.find(i => i.orderAfter === m.ordem);
    if (iv) {
      const trIv = document.createElement('tr');
      trIv.innerHTML = `
        <td>${m.ordem}</td>
        <td>Intervalo</td>
        <td>${iv.durationSec}</td>
      `;
      tbody.appendChild(trIv);
    }
  });
}
