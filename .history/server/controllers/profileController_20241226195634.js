const path = require('path');
const fs = require('fs');
const User = require('../models/User');

exports.updateAvatar = async (req, res) => {
  if (!req.file || req.file.mimetype !== 'image/png') {
    return res.status(400).json({ message: 'Only PNG files are allowed' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete the old avatar file if it exists
    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, '..', '..', 'public', user.avatar); // Ensure this path is correct
      if (fs.existsSync(oldAvatarPath)) fs.unlinkSync(oldAvatarPath);
    }

    // Save the new avatar path (ensure public path is served correctly)
    const newAvatarPath = `uploads/${req.file.filename}`;
    user.avatar = newAvatarPath;
    await user.save();

    res.json({
      message: 'Avatar updated successfully',
      avatar: newAvatarPath, // Send the updated avatar path
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating avatar' });
  }
};
