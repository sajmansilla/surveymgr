const express = require('express');
const {
    createQuestions,
    destroyQuestion,
    restoreQuestion
} = require('../controllers/questionController');
const router = express.Router();

// Route to create questions
router.post('/questions', createQuestions);
router.delete('/questions/:id', destroyQuestion);
router.post('/questions/:id/restore', restoreQuestion);

module.exports = router;
