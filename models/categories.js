const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class Category extends Model {}

Category.init({
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categories',
  timestamps: true,
  paranoid: true
});

module.exports = Category;
