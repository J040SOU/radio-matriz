const express = require('express');
const router = express.Router();
const PlaylistController = require('../controllers/PlaylistController');

router.get('/playlist', PlaylistController.getPlaylist);
router.post('/playlist', PlaylistController.addMusica); // adicionado

module.exports = router;
