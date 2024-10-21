const express = require('express');
const {
    createCategory,
    destroyCategory,
    restoreCategory } = require('../controllers/categoryController');
const router = express.Router();

// Route to create a category
router.post('/categories', createCategory);

router.delete('/categories/:id', destroyCategory);
router.post('/categories/:id/restore', restoreCategory);

module.exports = router;
