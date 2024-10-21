const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Survey = require('./surveys');
const Team = require('./teams');

class ParticipXSurvey extends Model {}

ParticipXSurvey.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  participant: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onDelete: 'CASCADE',
  }
}, {
  sequelize,
  modelName: 'ParticipXSurvey',
  tableName: 'particip_x_survey',
  timestamps: true,
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: ['survey_id', 'team_id', 'participant'],
    },
  ],
});

// Definir las relaciones.
ParticipXSurvey.belongsTo(Survey, { foreignKey: 'survey_id' });
ParticipXSurvey.belongsTo(Team, { foreignKey: 'team_id' });

module.exports = ParticipXSurvey;
