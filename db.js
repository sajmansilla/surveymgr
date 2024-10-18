const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://Sebastian.Mansilla:Seba.4521@localhost:5432/surveymgr', {
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    sequelize.sync({ force: false }).then(() => {
        console.log('Database & tables created!');
      });
      
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
