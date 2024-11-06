const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Get profile
router.get('/profile', authMiddleware, getProfile);

// Update profile
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
