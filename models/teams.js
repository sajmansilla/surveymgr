const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class Team extends Model {}

Team.init({
  team_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Team',
  tableName: 'teams',
  timestamps: true,
  paranoid: true
});

module.exports = Team;
