import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forum.css';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

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
        const postsCollection = collection(db, 'posts');
        const snapshot = await getDocs(postsCollection);
        const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      }
    };
  
    fetchPosts();
  }, []);

  // Add a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, author: 'user-id', likes: [], comments: [] }; // Add default values
  
    try {
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      setPosts([...posts, { id: docRef.id, ...newPost }]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding post:', error);
      setError('Error adding post. Please try again.');
    }
  };

  // Like a post
  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/posts/${postId}/like`);
      const updatedPost = response.data;

      // Update the liked post in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Error liking the post. Please try again.');
    }
  };

  // Add a comment
  const handleComment = async (postId) => {
    const newComment = { text: commentInputs[postId] || '', author: 'user-id' }; // Replace 'user-id' with actual user data

    try {
      const response = await axios.post(`http://localhost:3000/api/posts/${postId}/comments`, newComment);
      const updatedPost = response.data; // Backend should return the updated post

      // Update the commented post in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
      setCommentInputs({ ...commentInputs, [postId]: '' }); // Clear comment input
    } catch (error) {
      console.error('Error adding comment:', error);
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
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p>

          {/* Like button */}
          <button onClick={() => handleLike(post._id)}>
            Like ({post.likes || 0})
          </button>

          {/* Comment section */}
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
