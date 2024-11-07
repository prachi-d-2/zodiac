import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content, author: 'user-id' }; // Replace 'user-id' with actual user ID if needed
  
    axios.post('http://localhost:3000/api/posts', newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error('Error adding post:', error.response ? error.response.data : error.message);
        setError('Error adding post. Please try again.');
      });
  };

  const handleLike = (postId) => {
    axios.post(`http://localhost:3000/api/posts/${postId}/like`)
      .then((response) => {
        setPosts(posts.map(post => 
          post._id === postId ? { ...post, likes: response.data.likes } : post
        ));
      })
      .catch((error) => {
        console.error('Error liking post:', error);
      });
  };

  const handleComment = (postId, commentText) => {
    const newComment = { text: commentText, author: 'user-id' }; // Replace 'user-id' with actual user ID
    axios.post(`http://localhost:3000/api/posts/${postId}/comments`, newComment)
      .then((response) => {
        setPosts(posts.map(post => 
          post._id === postId ? { ...post, comments: response.data.comments } : post
        ));
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
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
          <button onClick={() => handleComment(post._id, prompt("Enter your comment:"))}>
            Comment ({post.comments ? post.comments.length : 0})
          </button>
          <div className="comments-section">
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
