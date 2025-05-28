// public/js/views/programacao.js
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

  // Busca músicas e intervalos simultaneamente
  const [musicas, intervals] = await Promise.all([
    api.getPlaylist(),
    api.getIntervals()
  ]);

  const tbody = document.getElementById('progBody');
  tbody.innerHTML = '';

  // Monta a programação com músicas e intervalos intercalados
  musicas.forEach(m => {
    // Linha da música: descrição nome, duração em branco
    const trMusic = document.createElement('tr');
    trMusic.innerHTML = `
      <td>${m.ordem}</td>
      <td>${m.nome}</td>
      <td></td>
    `;
    tbody.appendChild(trMusic);

    // Se houver intervalo após esta música, cria linha de intervalo
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
