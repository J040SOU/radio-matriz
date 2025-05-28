// controllers/PlaylistController.js
const Playlist = require('../models/PlaylistModel');

// 1) Listar todas as músicas
async function list(req, res) {
  const lista = await Playlist.find().sort({ ordem: 1 });
  res.json(lista);
}

// 2) Criar nova música
async function create(req, res) {
  try {
    const { nome, ordem, durationSec } = req.body;
    const musica = new Playlist({ nome, ordem, durationSec });
    await musica.save();
    res.status(201).json(musica);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

// 3) Atualizar dados de uma música
async function update(req, res) {
  try {
    const { id } = req.params;
    const { nome, ordem, durationSec } = req.body;
    const musica = await Playlist.findByIdAndUpdate(
      id,
      { nome, ordem, durationSec },
      { new: true, runValidators: true }
    );
    if (!musica) return res.status(404).json({ erro: 'Não encontrado' });
    res.json(musica);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

// 4) Excluir música
async function remove(req, res) {
  try {
    const { id } = req.params;
    const musica = await Playlist.findByIdAndDelete(id);
    if (!musica) return res.status(404).json({ erro: 'Não encontrado' });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

module.exports = { list, create, update, remove };
