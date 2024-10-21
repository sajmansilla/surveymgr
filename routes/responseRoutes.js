const express = require('express');
const {
    registerResponse,
    destroyResponse,
    restoreResponse
} = require('../controllers/responseController');
const router = express.Router();

router.post('/responses', registerResponse);
router.delete('/responses/:id', destroyResponse);
router.post('/responses/:id/restore', restoreResponse);

module.exports = router;
