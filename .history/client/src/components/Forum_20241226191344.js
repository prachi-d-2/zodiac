import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
import './Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [user, setUser] = useState(null); // State to store the logged-in user

  // Fetch the current user from Firebase Authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Store the current user in state
      } else {
        setUser(null); // No user is logged in
      }
    });
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

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
    if (!user) {
      setError('You must be logged in to post.');
      return;
    }
    const newPost = { title, content, author: user.uid, likes: [], comments: [] }; // Use user UID as author
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
    if (!user) {
      setError('You must be logged in to like a post.');
      return;
    }
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { likes: arrayUnion(user.uid) }); // Use user UID for liking
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likes: [...(post.likes || []), user.uid] }
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
    if (!user) {
      setError('You must be logged in to comment.');
      return;
    }
    const newComment = { text: commentInputs[postId] || '', author: user.uid, timestamp: new Date() };
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
      {user ? (
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
      ) : (
        <p>You must be logged in to create a post.</p>
      )}

      {/* Display posts */}
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p>

          {/* Like button */}
          {user ? (
            <button onClick={() => handleLike(post.id)}>
              Like ({post.likes?.length || 0})
            </button>
          ) : (
            <button disabled>Like ({post.likes?.length || 0})</button>
          )}

          {/* Comment section */}
          {user ? (
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
          ) : (
            <div className="comment-section">
              <input type="text" placeholder="Add a comment..." disabled />
              <button disabled>Comment ({post.comments?.length || 0})</button>
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