const Team = require('./teams');
const Person = require('./people');
const Participant = require('./participants');
const Survey = require('./surveys');
const ParticipXSurvey = require('./participXSurvey');
const Category = require('./categories');
const Question = require('./questions');
const QuestionsXSurvey = require('./questionsXSurvey');

// Relationships between models.
Team.belongsToMany(Person, { through: Participant, foreignKey: 'team_id' });
Person.belongsToMany(Team, { through: Participant, foreignKey: 'person_id' });

ParticipXSurvey.belongsTo(Survey, { foreignKey: 'survey_id' });
ParticipXSurvey.belongsTo(Team, { foreignKey: 'team_id' });

// Relationships for questions and surveys through questions_x_survey.
Survey.belongsToMany(Question, { through: QuestionsXSurvey, foreignKey: 'survey_id' });
Question.belongsToMany(Survey, { through: QuestionsXSurvey, foreignKey: 'question_id' });

// Define relationship between Category and Question.
Category.hasMany(Question, { foreignKey: 'category_id' });
Question.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = { 
  Team, 
  Person, 
  Participant, 
  Survey, 
  ParticipXSurvey, 
  Category, 
  Question, 
  QuestionsXSurvey 
};
