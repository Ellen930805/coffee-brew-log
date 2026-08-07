require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./src/sequelize');
const brewRoutes = require('./src/routes/brews');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/brews', brewRoutes);

if (require.main === module) {
  initializeDatabase()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
    })
    .catch((err) => {
      console.error('Failed to initialize database', err);
      process.exit(1);
    });
}

module.exports = app;
