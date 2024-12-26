const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { updateAvatar, getProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Profile routes
router.get('/profile', authMiddleware, getProfile);
router.put('/profile/avatar', authMiddleware, upload.single('avatar'), updateAvatar);

module.exports = router;
