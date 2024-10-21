const express = require('express');
const { registerResponse } = require('../controllers/responseController');
const router = express.Router();

router.post('/responses', registerResponse);

module.exports = router;
