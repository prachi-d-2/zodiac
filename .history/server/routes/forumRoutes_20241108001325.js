const express = require('express');
const router = express.Router();
const { likePost, addComment } = require('../controllers/postController');
const Post = require('../models/ForumPost');

// Route to like a post
router.post('/api/posts/:id/like', likePost);

// Route to add a comment to a post
router.post('/api/posts/:id/comments', addComment);

// POST: Create a new post
router.post('/api/posts', async (req, res) => {
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
router.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts. Please try again.' });
  }
});

module.exports = router;
