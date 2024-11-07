const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  avatar: {
    type: String, // Avatar image URL
  },
  bio: {
    type: String, // User's short bio
  },
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  swipedRightBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('User', userSchema);
