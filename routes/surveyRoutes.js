const express = require('express');
const { createSurvey,
    destroySurvey,
    restoreSurvey
} = require('../controllers/surveyController');
const router = express.Router();

// Endpoint to create surveys
router.post('/survey', createSurvey);
router.delete('/survey/:id', destroySurvey);
router.post('/survey/:id/restore', restoreSurvey);

module.exports = router;
