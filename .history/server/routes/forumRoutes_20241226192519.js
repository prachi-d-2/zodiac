const express = require('express');
const Post = require('../models/forumPost'); // Import the Post model
const router = express.Router();

// GET posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// POST a new post
router.post('/', async (req, res) => {
  const { title, content, author, likes, comments } = req.body;
  const newPost = new Post({ title, content, author, likes, comments });

  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: 'Error saving post' });
  }
});

// PATCH like a post
router.patch('/:postId/like', async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body; // userId should come from the client

  try {
    const post = await Post.findById(postId);
    if (!post.likes.includes(userId)) {
      post.likes.push(userId); // Add userId to the likes array
      await post.save();
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Error liking post' });
  }
});

// POST a comment
router.post('/:postId/comment', async (req, res) => {
  const { postId } = req.params;
  const { text, author, timestamp } = req.body;

  try {
    const post = await Post.findById(postId);
    post.comments.push({ text, author, timestamp });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Error adding comment' });
  }
});

module.exports = router;
