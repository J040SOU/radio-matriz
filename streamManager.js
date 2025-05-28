// streamManager.js
const fs           = require('fs');
const path         = require('path');
const EventEmitter = require('events');
const Playlist     = require('./models/PlaylistModel');
const Interval     = require('./models/IntervalModel');

class StreamManager extends EventEmitter {
  constructor() {
    super();
    this.clients     = new Set();
    this.playlist    = [];
    this.intervals   = [];
    this.index       = 0;
    this.playing     = false;
    this._timer      = null;
  }

  async loadData() {
    this.playlist  = await Playlist.find().sort({ ordem: 1 });
    this.intervals = await Interval.find({ active: true }).sort({ orderAfter: 1 });
  }

  async addClient(res) {
    this.clients.add(res);
    if (!this.playing) {
      await this.loadData();
      this._startCycle();
    }
  }

  removeClient(res) {
    this.clients.delete(res);
    if (this.clients.size === 0) this._stopCycle();
  }

  async _startCycle() {
    this.playing = true;
    this._cycle(); 
  }

  _stopCycle() {
    this.playing = false;
    clearTimeout(this._timer);
  }

  _cycle() {
    if (!this.playing) return;

    // 1) dispara evento de play
    const track = this.playlist[this.index];
    this.emit('play', { ordem: track.ordem, nome: track.nome });

    // 2) inicia pipe do arquivo para clientes
    const file = path.join(__dirname, 'musicas', `${track.nome}.mp3`);
    const stream = fs.createReadStream(file);
    stream.on('data', chunk => this.clients.forEach(r => r.write(chunk)));
    // Quando o arquivo terminar, não esperamos 'end' para o próximo—usamos timer.

    // 3) programe próximo passo após durationSec
    const dur = track.durationSec * 1000;
    this._timer = setTimeout(() => {
      // dispara intervalo se existir
      const iv = this.intervals.find(i => i.orderAfter === track.ordem);
      if (iv) {
        this.emit('interval', { ordem: iv.orderAfter, durationSec: iv.durationSec });
        // silencia: não manda bytes no período do intervalo
      }
      // avança índice
      this.index = (this.index + 1) % this.playlist.length;
      // ciclo seguinte após intervalo
      const pause = iv ? iv.durationSec * 1000 : 0;
      this._timer = setTimeout(() => this._cycle(), pause);
    }, dur);
  }
}

module.exports = new StreamManager();
