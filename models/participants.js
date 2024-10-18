const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class Participant extends Model {}

Participant.init({
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  person_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Participant',
  tableName: 'participants',
  timestamps: true
});

module.exports = Participant;
