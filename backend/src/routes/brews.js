const express = require('express');
const Brew = require('../models/brew');
const { initializeDatabase } = require('../sequelize');

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
await initializeDatabase();

```
const brews = await Brew.findAll({
  order: [['id', 'DESC']]
});

res.status(200).json(brews);
```

} catch (error) {
console.error(error);
res.status(500).json({
error: 'Failed to fetch brews'
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
tastingNotes
} = req.body;

if (
[
beans,
method,
coffeeGrams,
waterGrams,
rating,
tastingNotes
].some(isBlank)
) {
return res.status(400).json({
error: 'All fields are required'
});
}

try {
await initializeDatabase();

```
const brew = await Brew.create({
  beans,
  method,
  coffeeGrams,
  waterGrams,
  rating,
  tastingNotes
});

res.status(201).json(brew);
```

} catch (error) {
console.error(error);
res.status(500).json({
error: 'Failed to create brew'
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
tastingNotes
} = req.body;

if (
[
beans,
method,
coffeeGrams,
waterGrams,
rating,
tastingNotes
].some(isBlank)
) {
return res.status(400).json({
error: 'All fields are required'
});
}

try {
await initializeDatabase();

```
const brew = await Brew.findByPk(req.params.id);

if (!brew) {
  return res.status(404).json({
    error: 'Brew not found'
  });
}

await brew.update({
  beans,
  method,
  coffeeGrams,
  waterGrams,
  rating,
  tastingNotes
});

res.status(200).json(brew);
```

} catch (error) {
console.error(error);
res.status(500).json({
error: 'Failed to update brew'
});
}
});

// DELETE /api/brews/:id
router.delete('/:id', async (req, res) => {
try {
await initializeDatabase();

```
const brew = await Brew.findByPk(req.params.id);

if (!brew) {
  return res.status(404).json({
    error: 'Brew not found'
  });
}

await brew.destroy();

res.status(204).send();
```

} catch (error) {
console.error(error);
res.status(500).json({
error: 'Failed to delete brew'
});
}
});

module.exports = router;
