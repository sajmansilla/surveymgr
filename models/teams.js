const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Team = sequelize.define('team', {
  team_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Team;