const Post = require('../models/Post');  // Assuming Post model is created

// Create a new post
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;  // Assuming JWT token is used to get user info

  try {
    const newPost = new Post({ title, content, user: userId });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username email');  // Populate user info
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Edit a post (only by the creator)
const updatePost = async (req, res) => {
  const { postId, title, content } = req.body;
  try {
    const post = await Post.findById(postId);
    if (post.user.toString() !== req.user.id) {
      return res.status(403).send('Unauthorized');
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Delete a post (only by the creator)
const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (post.user.toString() !== req.user.id) {
      return res.status(403).send('Unauthorized');
    }

    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Controller to like a post
exports.likePost = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    post.likes += 1;
    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ error: 'Error liking the post' });
  }
};

// Controller to add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { text, author } = req.body;
    const post = await ForumPost.findById(req.params.id);
    post.comments.push({ text, author });
    await post.save();
    res.json({ comments: post.comments });
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
};


module.exports = { createPost, getPosts, updatePost, deletePost };
