const express = require('express');
const { createQuestions } = require('../controllers/questionController');
const router = express.Router();

// Route to create questions
router.post('/questions', createQuestions);

module.exports = router;
