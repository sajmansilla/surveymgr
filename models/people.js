const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class Person extends Model {}

Person.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Person',
  tableName: 'people',
  timestamps: true,
  paranoid: true
});

module.exports = Person;
