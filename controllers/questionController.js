const { Question } = require('../models');

// Endpoint to create new questions.
const createQuestions = async (req, res) => {
  const questionsData = req.body; // Suponiendo que se envía un array de preguntas.

  try {
    // Validate that input is array.
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
        enabled = true, // New questions are enabled by default, unless disabled
      } = questionData;

      // Create question
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
