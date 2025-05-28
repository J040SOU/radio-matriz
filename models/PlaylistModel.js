// models/PlaylistModel.js
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  nome:        { type: String, required: true },
  ordem:       { type: Number, required: true },
  durationSec: { type: Number, required: true }  // duração em segundos
});

module.exports = mongoose.model('Playlist', playlistSchema);
