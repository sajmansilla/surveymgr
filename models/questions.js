const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Category = require('./categories');

class Question extends Model {}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'category_id',
    },
    onDelete: 'CASCADE',
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calc_method: {
    type: DataTypes.STRING,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Question',
  tableName: 'questions',
  timestamps: true,
  paranoid: true
});

// Definir la relación con Category.
Question.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Question, { foreignKey: 'category_id' });

module.exports = Question;
