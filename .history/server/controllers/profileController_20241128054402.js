const User = require('../models/User');

// Get profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 
    if (!user) return res.status(404).json({ message: 'Profile not found.' });

    console.log(user);  // Log user data to check if fields like avatar, bio, zodiacSign are present
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve profile. Please try again later.' });
  }
};


// Create profile (during registration)
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

// Update profile (only bio and avatar are editable)
const updateProfile = async (req, res) => {
  try {
    // Ensure user is authenticated before updating profile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Only allow updates to bio and avatar
    const { bio } = req.body;

    if (bio) user.bio = bio; // Update bio if provided
    if (req.file) user.avatar = req.file.path; // Update avatar if file is provided

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile. Please try again later.' });
  }
};

// Swipe right (like user)
const swipeRight = async (req, res) => {
  try {
    const userId = req.user.id;
    const targetUserId = req.body.targetUserId;

    if (userId === targetUserId) {
      return res.status(400).json({ message: 'You cannot swipe on yourself.' });
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ message: 'User(s) not found.' });
    }

    // Check if the user has already swiped right on this user
    if (user.swipedRight.includes(targetUserId)) {
      return res.status(400).json({ message: 'You have already swiped right on this user.' });
    }

    // Add to swipedRight
    user.swipedRight.push(targetUserId);
    await user.save();

    // Check if target user has swiped right on the current user (match)
    if (targetUser.swipedRight.includes(userId)) {
      // Both users have swiped right, create a connection (match)
      user.connections.push(targetUserId);
      targetUser.connections.push(userId);
      await user.save();
      await targetUser.save();
      return res.status(200).json({ message: 'It\'s a match!', user: user, targetUser: targetUser });
    }

    res.status(200).json({ message: 'Swipe right successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to swipe right. Please try again later.' });
  }
};

// View all matches
const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('connections');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.status(200).json(user.connections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch matches. Please try again later.' });
  }
};

module.exports = { createProfile, updateProfile, getProfile, swipeRight, getMatches };
