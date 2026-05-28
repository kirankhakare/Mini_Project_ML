const express = require('express');

const router = express.Router();

const {
    predictStudent
} = require('../controllers/predictionController');

const {
    protect
} = require('../middleware/authMiddleware');


// Prediction Route

router.post('/', protect, predictStudent);


module.exports = router;