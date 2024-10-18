const express = require('express');
const { registerPeople } = require('../controllers/personController');
const router = express.Router();

// Endpoint to register people and teams
router.post('/register', registerPeople);

module.exports = router;
