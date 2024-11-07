const express = require('express');
const { getProfile, updateProfile , upload } = require('../controllers/profileController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Get profile
router.get('/profile', authMiddleware, getProfile);

// Update profile
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
