const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Path where you want to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  }
});

const upload = multer({ storage }).single('avatar'); // Handle single file upload with the field name 'avatar'

// Update profile to handle avatar upload
const updateProfileWithAvatar = async (req, res) => {
  try {
    const { username, email, zodiacSign, bio } = req.body;

    let profile = await Profile.findOne({ userId: req.user._id });

    if (!profile) {
      profile = new Profile({
        userId: req.user._id,
        username,
        email,
        zodiacSign,
        bio,
        avatar: req.file ? req.file.filename : null
      });
      await profile.save();
    } else {
      profile.username = username || profile.username;
      profile.email = email || profile.email;
      profile.zodiacSign = zodiacSign || profile.zodiacSign;
      profile.bio = bio || profile.bio;
      if (req.file) {
        profile.avatar = req.file.filename;
      }
      await profile.save();
    }

    res.json(profile); // Return updated profile
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save profile with avatar.' });
  }
};

module.exports = { getProfile, updateProfileWithAvatar, upload };
