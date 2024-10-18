const { Survey } = require('../models');

const createSurvey = async (req, res) => {
  const { name, date_start, date_end } = req.body;

  try {
    // Validar el formato del nombre de la encuesta
    if (!/^\d{2}\.\d{2}$/.test(name)) {
      return res.status(400).json({ message: 'Invalid survey name format. Use MM.YY.' });
    }

    // Crear la nueva survey
    const survey = await Survey.create({ name, date_start, date_end });

    res.status(201).json({ message: 'Survey created successfully', survey });
  } catch (error) {
    console.error('Error creating survey:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Survey with this name already exists' });
    }
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};

module.exports = { createSurvey };
