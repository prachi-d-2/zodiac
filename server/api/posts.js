const express = require('express');
const router = express.Router();
const ForumPost = require('../models/ForumPost');

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await ForumPost.find().populate('author');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/posts', async (req, res) => {
  const post = new ForumPost({
    author: req.body.author, // Ensure this is the ID of the logged-in user
    content: req.body.content,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
