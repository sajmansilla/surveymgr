const express = require('express');
const { createCategory } = require('../controllers/categoryController');
const router = express.Router();

// Route to create a category
router.post('/categories', createCategory);

module.exports = router;
