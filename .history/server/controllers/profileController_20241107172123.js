const Profile = require('../models/Profile'); // Profile model
const fs = require('fs'); // For file deletion if you need to handle avatar deletion

// Get the user's profile
const getProfile = async (req, res) => {
  try {
    // Find the profile using the user ID (from authMiddleware)
    const profile = await Profile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Please create one.' });
    }

    res.json(profile); // Send profile data back
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load profile.' });
  }
};

// Update the user's profile
const updateProfile = async (req, res) => {
  try {
    const { username, email, zodiacSign, bio, avatar } = req.body;

    // Check if the user already has a profile
    let profile = await Profile.findOne({ userId: req.user._id });

    // If no profile exists, create one
    if (!profile) {
      profile = new Profile({
        userId: req.user._id,
        username,
        email,
        zodiacSign,
        bio,
        avatar
      });
      await profile.save();
    } else {
      // If profile exists, update it
      profile.username = username || profile.username;
      profile.email = email || profile.email;
      profile.zodiacSign = zodiacSign || profile.zodiacSign;
      profile.bio = bio || profile.bio;
      profile.avatar = avatar || profile.avatar;
      await profile.save();
    }

    res.json(profile); // Return updated profile
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save profile.' });
  }
};

module.exports = { getProfile, updateProfile };
