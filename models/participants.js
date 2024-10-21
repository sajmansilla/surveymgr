const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Team = require('./teams');
const Person = require('./people');

class Participant extends Model {}

Participant.init({
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  person_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Participant',
  tableName: 'participants',
  timestamps: true,
});

// Definir las relaciones entre Team y Person a través de Participant.
Team.belongsToMany(Person, { through: Participant, foreignKey: 'team_id' });
Person.belongsToMany(Team, { through: Participant, foreignKey: 'person_id' });

module.exports = Participant;
