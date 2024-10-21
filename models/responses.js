const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class Response extends Model {}

Response.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  participant: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  survey_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'surveys',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'questions',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Response',
  tableName: 'responses',
  timestamps: true,
  paranoid: true
});

module.exports = Response;
