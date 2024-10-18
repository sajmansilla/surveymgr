const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Survey = sequelize.define('survey', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\d{2}\.\d{2}$/, // Validar el formato MM.YY
    }
  },
  date_start: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  date_end: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
}, {
  tableName: 'surveys',
});

module.exports = Survey;
