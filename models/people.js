const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Person = sequelize.define('person', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Person;