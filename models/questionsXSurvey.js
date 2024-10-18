const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

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
});

module.exports = QuestionsXSurvey;
