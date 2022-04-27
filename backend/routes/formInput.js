const express = require('express');
const router = express.Router();

const formInputController = require('../controllers/formInputController');

router.get('/', formInputController.getAll);
router.get('/find/kriteria/:id', formInputController.getByKriteriaId);

module.exports = router;