const express = require('express');
const multer = require('multer');
const { createProfile, updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set a unique filename
  }
});
const upload = multer({ storage: storage });

// Get profile
router.get('/profile', authMiddleware, getProfile);

router.post('/profile', upload.single('avatar'), authMiddleware, createProfile);

// PUT route for updating an existing profile
router.put('/profile', upload.single('avatar'), authMiddleware, updateProfile);

module.exports = router;
