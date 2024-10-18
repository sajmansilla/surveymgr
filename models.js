const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

// Modelo de Team
const Team = sequelize.define('team', {
  team_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

// Modelo de Person
const Person = sequelize.define('person', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

// Modelo de Participant (relación entre Team y Person)
const Participant = sequelize.define('participant', {});

// Relaciones
Team.belongsToMany(Person, { through: Participant, foreignKey: 'team_id' });
Person.belongsToMany(Team, { through: Participant, foreignKey: 'person_id' });

module.exports = { Team, Person, Participant };
