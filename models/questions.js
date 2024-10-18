const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class Question extends Model {}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calc_method: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Question',
  tableName: 'questions',
});

module.exports = Question;
