const fs = require('fs');
const path = require('path');
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      username: user.username,
      email: user.email,
      zodiacSign: user.zodiacSign,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile' });
  }
};

exports.updateAvatar = async (req, res) => {
  if (!req.file || req.file.mimetype !== 'image/png') {
    return res.status(400).json({ message: 'Only PNG files are allowed' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete the old avatar file if it exists
    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, '..', '..', user.avatar);
      if (fs.existsSync(oldAvatarPath)) fs.unlinkSync(oldAvatarPath);
    }

    // Update user's avatar with the new file path
    user.avatar = `uploads/${req.file.filename}`;
    await user.save();

    res.json({
      message: 'Avatar updated successfully',
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating avatar' });
  }
};