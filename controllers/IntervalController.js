const Interval = require('../models/IntervalModel');

async function list(req, res) {
  const lista = await Interval.find().sort({ orderAfter: 1 });
  res.json(lista);
}

async function create(req, res) {
  try {
    const { orderAfter, durationSec } = req.body;
    const iv = new Interval({ orderAfter, durationSec });
    await iv.save();
    res.status(201).json(iv);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const iv = await Interval.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!iv) return res.status(404).json({ erro: 'Não encontrado' });
    res.json(iv);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const iv = await Interval.findByIdAndDelete(id);
    if (!iv) return res.status(404).json({ erro: 'Não encontrado' });
    res.json({ mensagem: 'Intervalo excluído' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

module.exports = { list, create, update, remove };