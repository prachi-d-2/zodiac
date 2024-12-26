import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [userId, setUserId] = useState(null); // Assuming user ID is set after login

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      }
    };

    fetchPosts();
  }, []);

  // Add a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, author: userId }; // Use logged-in user's ID
    try {
      const response = await axios.post('http://localhost:5000/api/posts', newPost);
      setPosts([...posts, response.data]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error adding post:', err);
      setError('Error adding post. Please try again.');
    }
  };

  // Like a post
  const handleLike = async (postId) => {
    if (!userId) return; // If not logged in, prevent liking
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/like`, { userId });
      setPosts(posts.map((post) => (post._id === postId ? response.data : post)));
    } catch (err) {
      console.error('Error liking post:', err);
      setError('Error liking the post. Please try again.');
    }
  };

  // Add a comment
  const handleComment = async (postId) => {
    const newComment = { text: commentInputs[postId] || '', author: userId, timestamp: new Date() };
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, {
        userId,
        text: newComment.text,
      });
      setPosts(posts.map((post) => (post._id === postId ? response.data : post)));
      setCommentInputs({ ...commentInputs, [postId]: '' });
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Error adding comment. Please try again.');
    }
  };

  // Update comment input state
  const handleCommentInputChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  return (
    <div className="forum-container">
      <h2>Forum</h2>
      {error && <div className="error-message">{error}</div>}

      {/* Form for creating a new post */}
      {userId && (
        <form onSubmit={handleSubmit} className="post-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <button type="submit">Add Post</button>
        </form>
      )}

      {/* Display posts */}
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p>

          {/* Like button */}
          {userId && (
            <button onClick={() => handleLike(post._id)}>
              Like ({post.likes?.length || 0})
            </button>
          )}

          {/* Comment section */}
          {userId && (
            <div className="comment-section">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInputs[post._id] || ''}
                onChange={(e) => handleCommentInputChange(post._id, e.target.value)}
              />
              <button onClick={() => handleComment(post._id)}>
                Comment ({post.comments?.length || 0})
              </button>
            </div>
          )}

          {/* Display comments */}
          <div className="comments-list">
            {post.comments &&
              post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <strong>{comment.author}</strong>: {comment.text}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forum;
