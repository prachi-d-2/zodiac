const multer = require('multer');
const path = require('path');
const User = require('../models/User');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);  // Assuming you have JWT middleware to set user in request
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update profile
const updateProfile = async (req, res) => {
  const { username, email, zodiacSign, bio } = req.body;
  const avatar = req.file ? `/uploads/${req.file.filename}` : req.body.avatar;

  try {
    const user = await User.findById(req.user.id);

    user.username = username || user.username;
    user.email = email || user.email;
    user.zodiacSign = zodiacSign || user.zodiacSign;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = { getProfile, updateProfile, upload };
