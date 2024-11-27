const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Fetch profile data
router.get('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findOne({ userId: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save profile data
router.post('/profile', async (req, res) => {
  try {
    const { userId, name, bio, zodiacSign } = req.body;
    let profile = await Profile.findOne({ userId: userId });
    if (profile) {
      // Update existing profile
      profile.name = name;
      profile.bio = bio;
      profile.zodiacSign = zodiacSign;
      await profile.save();
    } else {
      // Create new profile
      profile = new Profile({ userId, name, bio, zodiacSign });
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
