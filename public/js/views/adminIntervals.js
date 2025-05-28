import { api } from '../services/api.js';

export async function renderAdminIntervals() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>📋 Gestão de Intervalos</h1>
    <form id="formAdd">
      <input type="number" id="orderAfter" placeholder="Após ordem da música" required />
      <input type="number" id="durationSec" placeholder="Duração (s)"  required />
      <button type="submit">Adicionar Intervalo</button>
    </form>
    <table border="1" id="tblInt">
      <thead>
        <tr><th>Após Ordem</th><th>Duração (s)</th><th>Ações</th></tr>
      </thead>
      <tbody id="bodyInt"></tbody>
    </table>
  `;

  const form = document.getElementById('formAdd');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const orderAfter  = parseInt(document.getElementById('orderAfter').value, 10);
    const durationSec = parseInt(document.getElementById('durationSec').value, 10);
    await api.addInterval({ orderAfter, durationSec });
    form.reset();
    carregar();
  });

  async function carregar() {
    const lista = await api.getIntervals();
    const tbody = document.getElementById('bodyInt');
    tbody.innerHTML = '';

    lista.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="number" value="${item.orderAfter}" data-id="${item._id}" class="editOrder" /></td>
        <td><input type="number" value="${item.durationSec}" data-id="${item._id}" class="editDur"  /></td>
        <td>
          <button class="btnSaveInt" data-id="${item._id}">💾 Salvar</button>
          <button class="btnDelInt"  data-id="${item._id}">🗑️ Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll('.btnSaveInt').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id;
        const orderAfter  = parseInt(document.querySelector(`.editOrder[data-id="${id}"]`).value, 10);
        const durationSec = parseInt(document.querySelector(`.editDur[data-id="${id}"]`).value, 10);
        await api.updateInterval(id, { orderAfter, durationSec });
        carregar();
      };
    });
    document.querySelectorAll('.btnDelInt').forEach(btn => {
      btn.onclick = async () => {
        await api.deleteInterval(btn.dataset.id);
        carregar();
      };
    });
  }

  carregar();
}
