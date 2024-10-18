const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class ParticipXSurvey extends Model {}

ParticipXSurvey.init({
  survey_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  participant: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'ParticipXSurvey',
  tableName: 'particip_x_survey',
  indexes: [
    {
      unique: true,
      fields: ['survey_id', 'team_id', 'participant'],
    },
  ],
});

module.exports = ParticipXSurvey;
