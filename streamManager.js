// streamManager.js
const fs        = require('fs');
const path      = require('path');
const { spawn } = require('child_process');
const EventEmitter = require('events');
const Playlist  = require('./models/PlaylistModel');
const Interval  = require('./models/IntervalModel');

class StreamManager extends EventEmitter {
  constructor() {
    super();
    this.clients   = new Set();
    this.playlist  = [];
    this.intervals = [];
    this.index     = 0;
    this.playing   = false;
  }

  async loadData() {
    this.playlist  = await Playlist.find().sort({ ordem: 1 });
    this.intervals = await Interval.find({ active: true }).sort({ orderAfter: 1 });
  }

  addClient(res) {
    this.clients.add(res);
    if (!this.playing) this.start();
  }

  removeClient(res) {
    this.clients.delete(res);
  }

  async start() {
    if (this.playing) return;
    this.playing = true;
    await this.loadData();
    this._runLoop();
  }

  stop() {
    this.playing = false;
  }

  async _runLoop() {
    while (this.playing) {
      // Se não há clientes, aguarde um pouco
      if (this.clients.size === 0) {
        await this._sleep(500);
        continue;
      }

      // 1) Toca a faixa atual
      const track = this.playlist[this.index];
      // console.log(`▶️  [PLAY] ordem ${track.ordem} → ${track.nome}`);
      this.emit('play', { ordem: track.ordem, nome: track.nome });
      await this._streamFile(path.join(__dirname, 'musicas', `${track.nome}.mp3`));

      // 2) Insere silêncio se houver intervalo
      const iv = this.intervals.find(i => i.orderAfter === track.ordem);
      if (iv) {
        // console.log(`⏸️  [INTERVAL] ordem ${iv.orderAfter} → ${iv.durationSec}s`);
        this.emit('interval', { ordem: iv.orderAfter, durationSec: iv.durationSec });
        await this._streamSilence(iv.durationSec);
      }

      // 3) Próxima faixa
      this.index = (this.index + 1) % this.playlist.length;
    }
    // console.log('🔴  Streaming parado');
  }

  _streamFile(filePath) {
    return new Promise(resolve => {
      const stream = fs.createReadStream(filePath);
      stream.on('data', chunk => {
        for (const res of this.clients) res.write(chunk);
      });
      stream.on('end', () => resolve());
      stream.on('error', err => {
        // console.error('❌  Erro no stream de arquivo:', err.message);
        resolve();
      });
    });
  }

  _streamSilence(seconds) {
    return new Promise(resolve => {
      // Chama ffmpeg para gerar silêncio exato
      const ff = spawn('ffmpeg', [
        '-loglevel', 'quiet',             // <— silencia as mensagens de log
        '-f', 'lavfi',
        '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100',
        '-t', seconds.toString(),
        '-f', 'mp3',
        '-'  // saída para stdout
      ], { stdio: ['ignore', 'pipe', 'inherit'] });

      ff.stdout.on('data', chunk => {
        for (const res of this.clients) res.write(chunk);
      });
      // Aguarda o ffmpeg terminar
      ff.on('close', code => {
        resolve();
      });
      ff.on('error', err => {
        // console.error('❌  Erro no ffmpeg:', err.message);
        resolve();
      });
    });
  }

  _sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
}

module.exports = new StreamManager();
