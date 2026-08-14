const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Brew = sequelize.define(
  "Brew",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    beans: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    coffeeGrams: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    waterGrams: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    tastingNotes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "brews",
    timestamps: false,
  }
);

module.exports = Brew;
