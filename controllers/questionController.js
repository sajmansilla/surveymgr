const { Question } = require('../models');

// Endpoint para crear nuevas preguntas.
const createQuestions = async (req, res) => {
  const questionsData = req.body; // Suponiendo que se envía un array de preguntas.

  try {
    // Validar que se envía un array
    if (!Array.isArray(questionsData)) {
      return res.status(400).json({ message: 'Request body must be an array of questions.' });
    }

    const createdQuestions = [];

    for (const questionData of questionsData) {
      const {
        question,
        category_id,
        type,
        calc_method,
        enabled = true, // Valor por defecto si no se proporciona
      } = questionData;

      // Crear la nueva pregunta
      const newQuestion = await Question.create({ question, category_id, enabled, type, calc_method });
      createdQuestions.push(newQuestion);
    }

    res.status(201).json({ message: 'Questions created successfully', questions: createdQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating questions', error: error.message });
  }
};

module.exports = { createQuestions };
