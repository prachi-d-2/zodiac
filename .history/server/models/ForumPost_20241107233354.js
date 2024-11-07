// server/models/ForumPost.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const forumPostSchema = new Schema({
  title: String,
  content: String,
  author: String,
  likes: { type: Number, default: 0 },
  comments: [commentSchema]
});

module.exports = mongoose.model('ForumPost', forumPostSchema);
