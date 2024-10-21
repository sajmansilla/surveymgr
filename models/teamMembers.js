const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Team = require('./teams');
const Person = require('./people');

class Member extends Model {}

Member.init({
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
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Member',
  tableName: 'team_members',
  timestamps: true,
  paranoid: true
});

// Definir las relaciones entre Team y Person a través de Participant.
Team.belongsToMany(Person, { through: Member, foreignKey: 'team_id' });
Person.belongsToMany(Team, { through: Member, foreignKey: 'person_id' });

module.exports = Member;
