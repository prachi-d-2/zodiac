const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false, // Optional field
  },
  avatar: {
    type: String, // Avatar image URL
  },
  bio: {
    type: String, // User's short bio
  },
  zodiacSign: {
    type: String, // The user's zodiac sign
    required: false, // Optional field for now
  },
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  swipedRightBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });  // Optional: Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('User', userSchema);
