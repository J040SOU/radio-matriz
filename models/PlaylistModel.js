const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  ordem: { type: Number, required: true }
});

module.exports = mongoose.model('Playlist', playlistSchema);
