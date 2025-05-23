const Playlist = require('../models/PlaylistModel');


async function getPlaylist(req, res) {
  try {
    const lista = await Playlist.find().sort({ ordem: 1 });
    res.json(lista);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar playlist' });
  }
}

// Novo método para adicionar música
async function addMusica(req, res) {
  try {
    const { nome, ordem } = req.body;
    const musica = new Playlist({ nome, ordem });
    await musica.save();
    res.status(201).json(musica);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao adicionar música' });
  }
}

module.exports = { getPlaylist, addMusica };
