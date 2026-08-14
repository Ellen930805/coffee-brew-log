const express = require('express');
const Brew = require('../models/brew');

const router = express.Router();

function isBlank(value) {
  return (
    value === undefined ||
    value === null ||
    String(value).trim() === ''
  );
}

// GET /api/brews
router.get('/', async (req, res) => {
  try {
    const brews = await Brew.findAll({
      order: [['id', 'DESC']],
    });

    res.status(200).json(brews);
  } catch (error) {
    console.error('GET /api/brews error:', error);

    res.status(500).json({
      error: 'Failed to fetch brews',
    });
  }
});

// POST /api/brews
router.post('/', async (req, res) => {
  const {
    beans,
    method,
    coffeeGrams,
    waterGrams,
    rating,
    tastingNotes,
  } = req.body;

  if (
    [
      beans,
      method,
      coffeeGrams,
      waterGrams,
      rating,
      tastingNotes,
    ].some(isBlank)
  ) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }

  try {
    const brew = await Brew.create({
      beans: String(beans).trim(),
      method: String(method).trim(),
      coffeeGrams: Number(coffeeGrams),
      waterGrams: Number(waterGrams),
      rating: Number(rating),
      tastingNotes: String(tastingNotes).trim(),
    });

    res.status(201).json(brew);
  } catch (error) {
    console.error('POST /api/brews error:', error);

    res.status(500).json({
      error: 'Failed to create brew',
    });
  }
});

// PUT /api/brews/:id
router.put('/:id', async (req, res) => {
  const {
    beans,
    method,
    coffeeGrams,
    waterGrams,
    rating,
    tastingNotes,
  } = req.body;

  if (
    [
      beans,
      method,
      coffeeGrams,
      waterGrams,
      rating,
      tastingNotes,
    ].some(isBlank)
  ) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }

  try {
    const brew = await Brew.findByPk(req.params.id);

    if (!brew) {
      return res.status(404).json({
        error: 'Brew not found',
      });
    }

    await brew.update({
      beans: String(beans).trim(),
      method: String(method).trim(),
      coffeeGrams: Number(coffeeGrams),
      waterGrams: Number(waterGrams),
      rating: Number(rating),
      tastingNotes: String(tastingNotes).trim(),
    });

    res.status(200).json(brew);
  } catch (error) {
    console.error('PUT /api/brews/:id error:', error);

    res.status(500).json({
      error: 'Failed to update brew',
    });
  }
});

// DELETE /api/brews/:id
router.delete('/:id', async (req, res) => {
  try {
    const brew = await Brew.findByPk(req.params.id);

    if (!brew) {
      return res.status(404).json({
        error: 'Brew not found',
      });
    }

    await brew.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('DELETE /api/brews/:id error:', error);

    res.status(500).json({
      error: 'Failed to delete brew',
    });
  }
});

module.exports = router;
