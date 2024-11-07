import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content, author: 'user-id' };

    axios.post('http://localhost:3000/api/posts', newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error('Error adding post:', error);
        setError('Error adding post. Please try again.');
      });
  };

  // Handle Like
  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:3000/posts/${postId}/like`);
      const updatedPost = response.data;

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Error liking the post. Please try again.');
    }
  };

  // Handle Comment Submission
  const handleComment = async (postId) => {
    const newComment = { text: commentInputs[postId] || '', author: 'user-id' };

    try {
      const response = await axios.post(`http://localhost:3000/posts/${postId}/comments`, newComment);
      const updatedPost = response.data; // Expect backend to return the updated post with new comments

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
      setCommentInputs({ ...commentInputs, [postId]: '' }); // Clear input after submit
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Error adding comment. Please try again.');
    }
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  return (
    <div className="forum-container">
      <h2>Forum</h2>
      {error && <div className="error-message">{error}</div>}

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

      {posts.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p>

          <button onClick={() => handleLike(post._id)}>
            Like ({post.likes || 0})
          </button>

          <div className="comment-section">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInputs[post._id] || ''}
              onChange={(e) => handleCommentInputChange(post._id, e.target.value)}
            />
            <button onClick={() => handleComment(post._id)}>
              Comment ({post.comments ? post.comments.length : 0})
            </button>
          </div>

          <div className="comments-list">
            {post.comments && post.comments.map((comment, index) => (
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
