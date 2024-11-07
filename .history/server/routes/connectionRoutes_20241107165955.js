const express = require('express');
const router = express.Router();
const { addConnection, removeConnection, getConnections, swipeRight } = require('../controllers/connectionController');
const authMiddleware = require('../middleware/authMiddleware');

// Get connections
router.get('/', authMiddleware, getConnections);

// Add connection
router.post('/add', authMiddleware, addConnection);

// Remove connection
router.post('/remove', authMiddleware, removeConnection);

// Swipe right to express interest
router.post('/swipe-right', authMiddleware, swipeRight);

module.exports = router;
