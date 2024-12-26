const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model is in the '../models/User' file
const Post = require('../models/ForumPost');

// POST: Create a new post
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error adding post. Please try again.' });
  }
});

// GET: Fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts. Please try again.' });
  }
});

// GET: Fetch username by userId
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId); // Assuming you have a User model
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ username: user.username });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Error fetching user' });
  }
});

module.exports = router;
