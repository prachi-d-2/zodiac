require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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


const bodyParser = require('body-parser');
const postRoutes = require('./routes/forumRoutes');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3001',  // Allow only this domain to make requests
};

app.use(cors(corsOptions));
app.use(bodyParser.json());  // Remove express.json() since bodyParser is already being used


// Suppress the deprecation warning for Mongoose
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Import and use other routes
app.use('/api/posts', postRoutes);

const horoscopeRoutes = require('./routes/horoscopeRoutes');
app.use('/api/horoscope', horoscopeRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const connectionRoutes = require('./routes/connectionRoutes');
app.use('/api/connections', connectionRoutes); // Use the connection routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
