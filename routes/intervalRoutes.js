const express = require('express');
const ctrl    = require('../controllers/IntervalController');
const router  = express.Router();

// /api/intervals
router.get('/',      ctrl.list);
router.post('/',     ctrl.create);
router.put('/:id',   ctrl.update);
router.delete('/:id',ctrl.remove);

module.exports = router;
