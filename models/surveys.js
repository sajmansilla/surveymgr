const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class Survey extends Model {}

Survey.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\d{2}\.\d{2}$/, // Validate name format as MM.YY
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
  sequelize,
  modelName: 'Survey',
  tableName: 'surveys',
  timestamps: true,
  paranoid: true
});

module.exports = Survey;
