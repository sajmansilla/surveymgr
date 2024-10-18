const express = require('express');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const questionRoutes = require('./routes/questionRoutes');
const { sequelize } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/api', personRoutes);
app.use('/api', surveyRoutes);
app.use('/api', categoryRoutes);
app.use('/api', questionRoutes);

// Sync DB and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
