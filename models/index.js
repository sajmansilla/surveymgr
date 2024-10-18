const Team = require('./teams');
const Person = require('./people');
const Participant = require('./participants');
const Survey = require('./surveys');
const ParticipXSurvey = require('./participXSurvey');

// Relationships between models.
Team.belongsToMany(Person, { through: Participant, foreignKey: 'team_id' });
Person.belongsToMany(Team, { through: Participant, foreignKey: 'person_id' });

// Survey.belongsToMany(Team, { through: ParticipXSurvey, foreignKey: 'survey_id' });
// Team.belongsToMany(Survey, { through: ParticipXSurvey, foreignKey: 'team_id' });
ParticipXSurvey.belongsTo(Survey, { foreignKey: 'survey_id' });
ParticipXSurvey.belongsTo(Team, { foreignKey: 'team_id' });

module.exports = { Team, Person, Participant, Survey, ParticipXSurvey };
