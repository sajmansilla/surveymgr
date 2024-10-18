const express = require('express');
const { registerPerson } = require('../controllers/personController');
const router = express.Router();

// Endpoint para registrar personas y equipos
router.post('/register', registerPerson);

module.exports = router;
