// routes/streamRoute.js
const express       = require('express');
const streamManager = require('../streamManager');
const router        = express.Router();

router.get('/msc', (req, res) => {
  res.set({
    'Content-Type':      'audio/mpeg',
    'Transfer-Encoding': 'chunked'
  });
  req.on('close', () => streamManager.removeClient(res));
  streamManager.addClient(res);
});

module.exports = router;
