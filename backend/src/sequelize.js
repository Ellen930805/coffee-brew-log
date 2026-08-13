```js
const path = require('path');
const fs = require('fs');
const { Sequelize } = require('sequelize');

const dataDirectory = path.join(__dirname, '..', 'data');

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const storagePath = path.join(
  dataDirectory,
  'coffee-brew-log.sqlite'
);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false,
});

async function initializeDatabase() {
  await sequelize.authenticate();

  // Recreate the database tables so they match the current model.
  await sequelize.sync({
    force: true,
  });

  console.log('Database connected and tables recreated.');
}

module.exports = {
  sequelize,
  initializeDatabase,
};
```
