const express = require('express');
const { getProfile, updateProfileWithAvatar, upload } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get profile
router.get('/profile', authMiddleware, getProfile);

router.post('/profile', upload.single('avatar'), authMiddleware, createProfile);

// PUT route for updating an existing profile
router.put('/profile', upload.single('avatar'), authMiddleware, updateProfile);

module.exports = router;
