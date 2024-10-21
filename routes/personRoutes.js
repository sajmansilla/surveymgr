const express = require('express');
const {
    registerPeople,
    destroyPerson,
    restorePerson
} = require('../controllers/personController');
const router = express.Router();

router.post('/register', registerPeople);
router.delete('/people/:id', destroyPerson);
router.post('/people/:id/restore', restorePerson);

module.exports = router;
