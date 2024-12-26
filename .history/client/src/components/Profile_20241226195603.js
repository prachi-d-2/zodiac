import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      console.log('Token from localStorage:', token); // Log the token to the console for verification

      if (!token) {
        setError('No token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }, // Add the token to the request headers
        });
        console.log(response.data); // Log the response to ensure the data is correct
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to load profile.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarChange = async (e) => {
    e.preventDefault();
    const file = avatar;
  
    // Ensure the uploaded file is a PNG
    if (!file || file.type !== 'image/png') {
      setError('Only PNG images are allowed.');
      return;
    }
  
    const formData = new FormData();
    formData.append('avatar', file);
  
    try {
      const response = await axios.put('/api/profile/avatar', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(prevProfile => ({
        ...prevProfile,
        avatar: response.data.avatar // Update profile with the new avatar
      }));
      setEditMode(false);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to update avatar.');
    }
  };
  

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={profile.avatar || 'default-avatar.png'}
          alt="Avatar"
          className="profile-avatar"
        />
        <div className="profile-details">
          <h2>{profile.username}</h2>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Zodiac Sign:</strong> {profile.zodiacSign || 'Not provided'}</p>
        </div>
      </div>

      {editMode ? (
        <form onSubmit={handleAvatarChange}>
          <div className="profile-section">
            <label htmlFor="avatar">Update Avatar (PNG only):</label>
            <input
              type="file"
              id="avatar"
              accept="image/png"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          <button type="submit" className="edit-profile-button">Save Avatar</button>
          <button
            type="button"
            className="edit-profile-button cancel"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          className="edit-profile-button"
          onClick={() => setEditMode(true)}
        >
          Edit Avatar
        </button>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Profile;
