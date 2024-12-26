const express = require('express');
const router = express.Router();
const { addConnection, removeConnection, getConnections } = require('../controllers/connectionController');
const authMiddleware = require('../middleware/authMiddleware');  // Assuming you have an auth middleware

// Add connection
//router.post('/connections', authMiddleware, addConnection);

// Remove connection
//router.delete('/connections', authMiddleware, removeConnection);

// Get connections
//router.get('/connections', authMiddleware, getConnections);

module.exports = router;
