const User = require('../models/User');

// Get profile
const getProfile = async (req, res) => {
  try {
    // Ensure user is authenticated before fetching profile
    const user = await User.findById(req.user.id); 
    if (!user) return res.status(404).json({ message: 'Profile not found.' });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve profile. Please try again later.' });
  }
};

// Create profile
const createProfile = async (req, res) => {
  try {
    const { username, email, zodiacSign, bio } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already taken.' });
    }

    const user = new User({
      username,
      email,
      zodiacSign,
      bio,
      avatar: req.file ? req.file.path : null,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create profile. Please try again later.' });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    // Ensure user is authenticated before updating profile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const { zodiacSign, bio } = req.body;

    // Update only if new value is provided
    if (zodiacSign) user.zodiacSign = zodiacSign;
    if (bio) user.bio = bio;
    if (req.file) user.avatar = req.file.path;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile. Please try again later.' });
  }
};

module.exports = { createProfile, updateProfile };