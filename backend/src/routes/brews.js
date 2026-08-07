const express = require('express');
const Brew = require('../models/brew');
const { initializeDatabase } = require('../sequelize');

const router = express.Router();

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

router.get('/', async (req, res) => {
  try {
    await initializeDatabase();
    const brews = await Brew.findAll({ order: [['id', 'DESC']] });
    res.json(brews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brews' });
  }
});

router.post('/', async (req, res) => {
  const { coffee, roast, method, ratio, notes, date } = req.body;

  await initializeDatabase();

  if ([coffee, roast, method, ratio, notes, date].some(isBlank)) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const brew = await Brew.create({ coffee, roast, method, ratio, notes, date });
    res.status(201).json(brew);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create brew' });
  }
});

router.put('/:id', async (req, res) => {
  const { coffee, roast, method, ratio, notes, date } = req.body;

  await initializeDatabase();

  if ([coffee, roast, method, ratio, notes, date].some(isBlank)) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) {
      return res.status(404).json({ error: 'Brew not found' });
    }

    await brew.update({ coffee, roast, method, ratio, notes, date });
    res.json(brew);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update brew' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await initializeDatabase();
    const brew = await Brew.findByPk(req.params.id);
    if (!brew) {
      return res.status(404).json({ error: 'Brew not found' });
    }

    await brew.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete brew' });
  }
});

module.exports = router;
