const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Connect to MongoDB Atlas
mongoose.connect('mongodb://your-mongodb-uri', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  likes: [String], // Array of user ids who liked the post
  comments: [{ text: String, author: String, timestamp: Date }],
});

const Post = mongoose.model('Post', postSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route to get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).send('Error fetching posts');
  }
});

// Route to create a new post
app.post('/api/posts', async (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({
    title,
    content,
    author,
    likes: [],
    comments: [],
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).send('Error adding post');
  }
});

// Route to like a post
app.post('/api/posts/:id/like', async (req, res) => {
  const { userId } = req.body; // Get the user ID from the request body

  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(userId)) {
      post.likes.push(userId); // Add user ID to likes array
      await post.save();
      res.json(post);
    } else {
      res.status(400).send('User already liked this post');
    }
  } catch (err) {
    res.status(500).send('Error liking post');
  }
});

// Route to add a comment to a post
app.post('/api/posts/:id/comment', async (req, res) => {
  const { userId, text } = req.body; // Get user ID and comment text from the request body

  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ text, author: userId, timestamp: new Date() });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Error adding comment');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
