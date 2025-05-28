import { api } from '../services/api.js';

export async function renderAdminPlaylist() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>✏️ Gestão de Músicas</h1>
    <form id="formAdd">
      <input type="text" id="nome"        placeholder="Nome da música" required />
      <input type="number" id="ordem"       placeholder="Ordem" required />
      <input type="number" id="durationSec" placeholder="Duração (s)" required />
      <button type="submit">Adicionar</button>
    </form>
    <table border="1" id="tbl">
      <thead>
        <tr>
          <th>Ordem</th>
          <th>Nome</th>
          <th>Duração (s)</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody id="body"></tbody>
    </table>
  `;

  const form = document.getElementById('formAdd');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const nome        = document.getElementById('nome').value;
    const ordem       = +document.getElementById('ordem').value;
    const durationSec = +document.getElementById('durationSec').value;
    await api.addMusica({ nome, ordem, durationSec });
    form.reset();
    carregar();
  });

  async function carregar() {
    const lista = await api.getPlaylist();
    const tbody = document.getElementById('body');
    tbody.innerHTML = '';

    lista.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="number" value="${item.ordem}"       data-id="${item._id}" class="editOrdem" /></td>
        <td><input type="text"   value="${item.nome}"        data-id="${item._id}" class="editNome"  /></td>
        <td><input type="number" value="${item.durationSec}" data-id="${item._id}" class="editDur"   /></td>
        <td>
          <button class="btnSave" data-id="${item._id}">💾 Salvar</button>
          <button class="btnDel"  data-id="${item._id}">🗑️ Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll('.btnSave').forEach(btn => {
      btn.onclick = async () => {
        const id         = btn.dataset.id;
        const nome       = document.querySelector(`.editNome[data-id="${id}"]`).value;
        const ordem      = +document.querySelector(`.editOrdem[data-id="${id}"]`).value;
        const durationSec= +document.querySelector(`.editDur[data-id="${id}"]`).value;
        await api.updateMusica(id, { nome, ordem, durationSec });
        carregar();
      };
    });
    document.querySelectorAll('.btnDel').forEach(btn => {
      btn.onclick = async () => {
        await api.deleteMusica(btn.dataset.id);
        carregar();
      };
    });
  }

  carregar();
}
