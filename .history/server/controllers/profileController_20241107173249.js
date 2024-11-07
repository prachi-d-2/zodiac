const User = require('../models/User');  // Assuming you're using Mongoose for MongoDB

// Create or update profile
const createProfile = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      zodiacSign: req.body.zodiacSign,
      bio: req.body.bio,
      avatar: req.file ? req.file.path : null, // Store avatar path if file is uploaded
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Failed to save profile.' });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming `req.user` is set by the auth middleware

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.zodiacSign = req.body.zodiacSign || user.zodiacSign;
    user.bio = req.body.bio || user.bio;

    if (req.file) {
      user.avatar = req.file.path; // Update avatar if a new file is uploaded
    }

    await user.save();
    res.status(200).json(user);  // Send the updated profile back
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to save profile.' });
  }
};

module.exports = { createProfile, updateProfile };
