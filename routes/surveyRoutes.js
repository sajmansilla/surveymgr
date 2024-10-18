const express = require('express');
const { createSurvey } = require('../controllers/surveyController');
const router = express.Router();

// Endpoint to create surveys
router.post('/survey', createSurvey);

module.exports = router;
