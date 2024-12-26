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
  const [usernames, setUsernames] = useState({}); // Store usernames for each userId

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'posts');
        const snapshot = await getDocs(postsCollection);
        const posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data, comments: Array.isArray(data.comments) ? data.comments : [] };
        });
        setPosts(posts);

        // Extract all user IDs from posts (author, likes, comments)
        const userIds = new Set();
        posts.forEach((post) => {
          userIds.add(post.author); // Add post author
          post.likes.forEach((like) => userIds.add(like)); // Add likers
          post.comments.forEach((comment) => userIds.add(comment.author)); // Add commenters
        });

        // Fetch usernames for each unique userId
        userIds.forEach(async (userId) => {
          if (!usernames[userId]) {
            try {
              const response = await fetch(`/api/user/${userId}`);
              const data = await response.json();
              if (data.username) {
                setUsernames((prev) => ({ ...prev, [userId]: data.username }));
              } else {
                console.error(`Username not found for userId: ${userId}`);
              }
            } catch (err) {
              console.error('Error fetching username:', err);
            }
          }
        });
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      }
    };

    fetchPosts();
  }, [usernames]); // Re-run when usernames object changes

  // Add a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, author: 'user-id', likes: [], comments: [] }; // Replace 'user-id' with actual user ID
    try {
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      setPosts([...posts, { id: docRef.id, ...newPost }]);
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
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { likes: arrayUnion('user-id') }); // Replace 'user-id' with actual user ID
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likes: [...(post.likes || []), 'user-id'] }
            : post
        )
      );
    } catch (err) {
      console.error('Error liking post:', err);
      setError('Error liking the post. Please try again.');
    }
  };

  // Add a comment
  const handleComment = async (postId) => {
    const newComment = { text: commentInputs[postId] || '', author: 'user-id', timestamp: new Date() }; // Replace 'user-id' with actual user ID
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { comments: arrayUnion(newComment) });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...(post.comments || []), newComment] }
            : post
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

          {/* Author */}
          <div>Author: {usernames[post.author] || 'Loading...'}</div>

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
                  <strong>{usernames[comment.author] || 'Loading...'}</strong>: {comment.text}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forum;
