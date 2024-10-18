const Team = require('./teams');
const Person = require('./people');
const Participant = require('./participants');

// Relationships between models.
Team.belongsToMany(Person, { through: Participant, foreignKey: 'team_id' });
Person.belongsToMany(Team, { through: Participant, foreignKey: 'person_id' });

module.exports = { Team, Person, Participant };
