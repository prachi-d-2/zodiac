const express = require('express');
const multer = require('multer');
const { createProfile, updateProfile, getProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/profile', authMiddleware, upload.single('avatar'), createProfile);
router.put('/profile', authMiddleware, upload.single('avatar'), updateProfile);

module.exports = router;