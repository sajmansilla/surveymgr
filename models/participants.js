const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Participant = sequelize.define('participant', {});

module.exports = Participant;
