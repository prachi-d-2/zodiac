import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts')  // Use the correct backend URL
      .then((response) => {
        setPosts(response.data);  // Store posts in state
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);
  
  
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
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Forum;
