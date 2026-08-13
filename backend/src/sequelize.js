```js
const path = require('path');
const fs = require('fs');
const { Sequelize } = require('sequelize');

const dataDirectory = path.join(__dirname, '..', 'data');

// Make sure the data directory exists
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

  await sequelize.sync({
    force: false,
  });

  console.log('Database connected and synchronized.');
}

module.exports = {
  sequelize,
  initializeDatabase,
};
```
