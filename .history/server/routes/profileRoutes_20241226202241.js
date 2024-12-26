const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Path to your User model
const authMiddleware = require('../middlewares/authMiddleware'); // Correct path to middleware

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Access `req.user` populated by authMiddleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      email: user.email,
      zodiacSign: user.zodiacSign || 'Not provided',
      avatar: user.avatar || 'default-avatar.png',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
