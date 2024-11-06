const express = require('express');
const router = express.Router();
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/forumController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to check if user is authenticated

// Create post
router.post('/posts', authMiddleware, createPost);

// Get all posts
router.get('/posts', getPosts);

// Edit post (only by the creator)
router.put('/posts', authMiddleware, updatePost);

// Delete post (only by the creator)
router.delete('/posts/:postId', authMiddleware, deletePost);

module.exports = router;
