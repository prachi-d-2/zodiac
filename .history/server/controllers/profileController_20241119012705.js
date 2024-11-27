const Profile = require('../models/Profile');

const createProfile = async (req, res) => {
  try {
    const profile = new Profile({
      userId: req.user.id,
      username: req.body.username,
      email: req.body.email,
      zodiacSign: req.body.zodiacSign,
      bio: req.body.bio,
      avatar: req.file ? req.file.path : null,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save profile.' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found.' });

    profile.username = req.body.username || profile.username;
    profile.email = req.body.email || profile.email;
    profile.zodiacSign = req.body.zodiacSign || profile.zodiacSign;
    profile.bio = req.body.bio || profile.bio;
    if (req.file) profile.avatar = req.file.path;

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save profile.' });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found.' });

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve profile.' });
  }
};

module.exports = { createProfile, updateProfile, getProfile };

