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
    required: false // Optional field 
  },
  avatar: { 
    type: String, // URL for avatar image 
    required: false 
  },
  bio: { 
    type: String, // Short bio 
    required: false 
  },
  zodiacSign: { 
    type: String, // Zodiac sign
    required: false 
  },
  connections: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }], // Tracks users the current user is connected with (matches)
  swipedRight: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }], // Tracks users that the current user has swiped right (liked)
  swipedRightBy: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }], // Tracks users who have swiped right (liked) the current user
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);
