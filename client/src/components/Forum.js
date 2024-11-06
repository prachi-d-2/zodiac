// src/components/Forum.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forum = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')  // Assuming the posts route is set up
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h2>Forum</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Forum;
