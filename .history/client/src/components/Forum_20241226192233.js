import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import './Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        setPosts(data);
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
    const newPost = { title, content, author: 'user-id', likes: [], comments: [] }; // Replace 'user-id' with actual user ID
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([...posts, data]);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error adding post:', err);
      setError('Error adding post. Please try again.');
    }
  };
  
  // Like a post
  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 'user-id' }), // Replace with actual user ID
      });
      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? updatedPost : post
        )
      );
    } catch (err) {
      console.error('Error liking post:', err);
      setError('Error liking the post. Please try again.');
    }
  };
  

  // Add a comment
  const handleComment = async (postId) => {
    const newComment = { text: commentInputs[postId] || '', author: 'user-id', timestamp: new Date() };
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });
      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? updatedPost : post
        )
      );
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

      {/* Display posts */}
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p>

          {/* Like button */}
          <button onClick={() => handleLike(post.id)}>
            Like ({post.likes?.length || 0})
          </button>

          {/* Comment section */}
          <div className="comment-section">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentInputs[post.id] || ''}
              onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
            />
            <button onClick={() => handleComment(post.id)}>
              Comment ({post.comments?.length || 0})
            </button>
          </div>

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
