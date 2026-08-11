:::writing{variant="document" id="68421"}
const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const Brew = sequelize.define('Brew', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  beans: {
    type: DataTypes.STRING,
    allowNull: false
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false
  },
  coffeeGrams: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  waterGrams: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tastingNotes: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'brews',
  timestamps: false
});

module.exports = Brew;
:::

### VERY IMPORTANT

In VS Code, your file should look like this:

```text
const { DataTypes } = require('sequelize');
...
module.exports = Brew;
