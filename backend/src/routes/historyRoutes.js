const express = require('express');

const router = express.Router();

const {
    getHistory,
    getDashboardStats
} = require('../controllers/historyController');

const {
    protect
} = require('../middleware/authMiddleware');


router.get('/', protect, getHistory);
router.get(
    '/dashboard-stats',
    protect,
    getDashboardStats
);

module.exports = router;