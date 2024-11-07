const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    zodiacSign: { type: String, required: false },
    bio: { type: String, required: false },
    avatar: { type: String, required: false }, // Store avatar URL or path
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
