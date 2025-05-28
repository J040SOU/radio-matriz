const express = require('express');
const ctrl    = require('../controllers/PlaylistController');
const router  = express.Router();

// /api/playlist
router.get('/',      ctrl.list);
router.post('/',     ctrl.create);
router.put('/:id',   ctrl.update);
router.delete('/:id',ctrl.remove);

module.exports = router;