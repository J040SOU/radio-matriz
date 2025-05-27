const express = require('express');
const mongoose = require('mongoose');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
app.use(express.json());
app.use('/api', playlistRoutes);

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// Usa a variável de ambiente MONGO_URL vinda do docker-compose.yml
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/radio';


mongoose.connect(mongoUrl)
  .then(() => {
    console.log(`✅ Conectado ao MongoDB em: ${mongoUrl}`);
    app.listen(3000, () =>
      console.log('🚀 Servidor rodando em http://localhost:3000')
    );
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no MongoDB:', err);
  });
