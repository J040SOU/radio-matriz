const mongoose = require('mongoose');
const intervalSchema = new mongoose.Schema({
  orderAfter:  { type: Number, required: true }, // após qual ordem de música
  durationSec: { type: Number, required: true }, // duração em segundos
  active:      { type: Boolean, default: true }
});
module.exports = mongoose.model('Interval', intervalSchema);