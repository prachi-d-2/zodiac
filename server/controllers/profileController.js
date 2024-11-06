const User = require('../models/User');

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
  const { username, email, avatar } = req.body;

  try {
    const user = await User.findById(req.user.id);

    user.username = username || user.username;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = { getProfile, updateProfile };
