const express = require('express');
const { getProfile, updateProfileWithAvatar, upload } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get profile
router.get('/profile', authMiddleware, getProfile);

// Update profile (with avatar upload handling)
router.put('/profile', authMiddleware, upload, updateProfileWithAvatar);

module.exports = router;
