const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true }, // You might want to link this to a User model
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
