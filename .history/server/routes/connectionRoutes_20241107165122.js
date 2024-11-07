const express = require('express');
const router = express.Router();
const { addConnection, removeConnection, getConnections } = require('../controllers/connectionController');
const authMiddleware = require('../middleware/authMiddleware');

// Get connections
router.get('/', authMiddleware, getConnections);

// Add connection
router.post('/add', authMiddleware, addConnection);

// Remove connection
router.post('/remove', authMiddleware, removeConnection);

module.exports = router;
