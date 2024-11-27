const User = require('../models/User');

const createProfile = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      zodiacSign: req.body.zodiacSign,
      bio: req.body.bio,
      avatar: req.file ? req.file.path : null,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save profile.' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.zodiacSign = req.body.zodiacSign || user.zodiacSign;
    user.bio = req.body.bio || user.bio;
    if (req.file) user.avatar = req.file.path;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save profile.' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Profile not found.' });

    // Respond with profile data
    res.status(200).json({
      username: user.username,
      email: user.email,
      zodiacSign: user.zodiacSign,
      bio: user.bio,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve profile.' });
  }
};

module.exports = { createProfile, updateProfile };
