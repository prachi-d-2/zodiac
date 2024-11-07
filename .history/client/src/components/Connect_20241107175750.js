import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Connect.css';

function Connect() {
  const [users, setUsers] = useState([]); // Users displayed on cards
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Handle loading state

  // Fetch users to display as potential matches
  const fetchUsers = async () => {
    setLoading(true); // Set loading to true when fetching
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle swipe right (interested)
  const handleSwipeRight = async () => {
    const userId = users[currentIndex]._id;
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.post(
        'http://localhost:3000/api/connections/swipe-right',
        { targetUserId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.match) {
        setMatchedUsers((prev) => [...prev, data.matchedUser]);
        alert(`It's a match with ${data.matchedUser.name}!`);
      }

      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error('Error handling swipe right:', error);
    }
  };

  // Handle swipe left (not interested)
  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // No more users to display
  if (currentIndex >= users.length) {
    return <div className="connect">No more users to show.</div>;
  }

  const currentUser = users[currentIndex];

  return (
    <div className="connect">
      <h2>Discover New Connections</h2>

      {loading ? (
        <div>Loading users...</div> // Show loading indicator while fetching users
      ) : (
        <div className="user-card">
          <img
            src={currentUser.avatar || 'default-avatar.png'}
            alt={`${currentUser.name}`}
          />
          <h3>{currentUser.name}</h3>
          <p>{currentUser.bio}</p>
          <div className="swipe-buttons">
            <button onClick={handleSwipeLeft} className="swipe-left">
              ✕
            </button>
            <button onClick={handleSwipeRight} className="swipe-right">
              ♡
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Connect;
