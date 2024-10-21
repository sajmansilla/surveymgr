const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Survey = require('./surveys');
const Question = require('./questions');

class QuestionsXSurvey extends Model {}

QuestionsXSurvey.init({
  survey_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'surveys',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'questions',
      key: 'id',
    },
    onDelete: 'CASCADE',
  }
}, {
  sequelize,
  modelName: 'QuestionsXSurvey',
  tableName: 'questions_x_survey',
  timestamps: true,
  paranoid: true
});

// Definir las relaciones.
Survey.belongsToMany(Question, { through: QuestionsXSurvey, foreignKey: 'survey_id' });
Question.belongsToMany(Survey, { through: QuestionsXSurvey, foreignKey: 'question_id' });

module.exports = QuestionsXSurvey;
