const express = require('express');
const fs = require('fs');
const path = require('path');
const Playlist = require('../models/PlaylistModel');

const router = express.Router();

router.get('/msc', async (req, res) => {
 console.log("🔊 Rota /msc foi chamada");
  res.set({
    'Content-Type': 'audio/mpeg',
    'Transfer-Encoding': 'chunked',
  });

  try {
    const playlist = await Playlist.find().sort({ ordem: 1 });

    if (!playlist.length) {
      return res.status(404).send('Nenhuma música encontrada na playlist.');
    }

    const musicas = playlist.map((m) =>
      path.join(__dirname, '..', 'musicas', `${m.nome}.mp3`)
    );

    let index = 0;

    const tocarProxima = () => {
      if (index >= musicas.length) index = 0;

      const musicaPath = musicas[index];
      const stream = fs.createReadStream(musicaPath);

      stream.pipe(res, { end: false });

      stream.on('end', () => {
        index++;
        tocarProxima();
      });

      stream.on('error', (err) => {
        console.error('Erro ao tocar música:', err.message);
        index++;
        tocarProxima();
      });
    };

    tocarProxima();
  } catch (err) {
    console.error('Erro ao acessar playlist:', err);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
