const User = require('../models/User');

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ message: 'Failed to load profile.' });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const { bio, zodiacSign } = req.body;

    if (bio) user.bio = bio;
    if (zodiacSign) user.zodiacSign = zodiacSign;
    if (req.file) user.avatar = req.file.path;

    await user.save();
    res.json({ message: 'Profile updated successfully.', user });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Failed to save profile.' });
  }
};

module.exports = { getProfile, updateProfile };
