// routes/eventsRoute.js
const express       = require('express');
const streamManager = require('../streamManager');
const router        = express.Router();

router.get('/', (req, res) => {
  // cabeçalhos SSE
  res.set({
    'Content-Type':  'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection':    'keep-alive'
  });
  res.flushHeaders && res.flushHeaders();

  const onPlay = data => {
    res.write(`event: play\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  const onInterval = data => {
    res.write(`event: interval\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  streamManager.on('play', onPlay);
  streamManager.on('interval', onInterval);

  // limpar listeners quando o cliente desconecta
  req.on('close', () => {
    streamManager.removeListener('play', onPlay);
    streamManager.removeListener('interval', onInterval);
  });
});

module.exports = router;
