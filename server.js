const express        = require('express');
const mongoose       = require('mongoose');
const path           = require('path');

const playlistRoutes = require('./routes/playlistRoutes');
const intervalRoutes = require('./routes/intervalRoutes');
const streamRoute    = require('./routes/streamRoute');
const eventsRoute    = require('./routes/eventsRoute');

const app = express();
app.use(express.json());

// CRUD de músicas e intervalos
app.use('/api/playlist',  playlistRoutes);
app.use('/api/intervals', intervalRoutes);

// streaming e eventos
app.use('/api/stream', streamRoute);
app.use('/api/events', eventsRoute);

// front-end SPA + programação
app.use(express.static(path.join(__dirname, 'public')));

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/radio';
mongoose.connect(mongoUrl)
  .then(() => {
    console.log(`✅  Conectado ao MongoDB: ${mongoUrl}`);
    app.listen(3000, () =>
      console.log('🚀  Servidor no http://localhost:3000')
    );
  })
  .catch(err => console.error('❌  Erro DB:', err));
