const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const Brew = sequelize.define('Brew', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  coffee: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roast: {
    type: DataTypes.STRING,
    allowNull: false
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ratio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'brews',
  timestamps: false
});

module.exports = Brew;
