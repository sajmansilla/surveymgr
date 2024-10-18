const express = require('express');
const bodyParser = require('body-parser');
const personRoutes = require('./routes/personRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const { sequelize } = require('./db'); // Ajusta la ruta si es necesario

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Usar las rutas de persona
app.use('/api', personRoutes);
app.use('/api', surveyRoutes);

// Sincronizar la base de datos y empezar el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
