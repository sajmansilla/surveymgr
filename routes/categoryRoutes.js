const express = require('express');
const { createCategory } = require('../controllers/categoryController');
const router = express.Router();

// Ruta para crear una categoría
router.post('/categories', createCategory);

module.exports = router;
