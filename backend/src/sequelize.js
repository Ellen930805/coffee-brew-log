const path = require('path');
const { Sequelize } = require('sequelize');

const storagePath = path.join(__dirname, '..', 'data', 'coffee-brew-log.sqlite');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false
});

async function initializeDatabase() {
  await sequelize.authenticate();
  await sequelize.sync({ force: false });
}

module.exports = { sequelize, initializeDatabase };
