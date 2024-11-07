import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import specific styles for Profile

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', zodiacSign: '', bio: '', avatar: '' });
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    axios.get('/api/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        setProfile(response.data);
        setProfileExists(true);
      })
      .catch(error => console.log(error));
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setFormData({ 
      username: profile.username, 
      email: profile.email, 
      zodiacSign: profile.zodiacSign, 
      bio: profile.bio, 
      avatar: profile.avatar 
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('zodiacSign', formData.zodiacSign);
    data.append('bio', formData.bio);
    if (formData.avatar instanceof File) {
      data.append('avatar', formData.avatar);
    }

    axios.put('/api/profile', data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        setProfile(response.data);
        setEditMode(false);
        setProfileExists(true);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={profile.avatar || 'default-avatar.png'} alt="Avatar" className="profile-avatar" />
        <div className="profile-details">
          <h2>{profile.username}</h2>
          <p><strong>Zodiac Sign:</strong> {profile.zodiacSign}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
        </div>
      </div>
      <div>
        <h2>{editMode ? 'Edit Profile' : 'Your Profile'}</h2>
        {editMode ? (
          <form onSubmit={handleSave}>
            <div className="profile-section">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="profile-section">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="profile-section">
              <label htmlFor="zodiacSign">Zodiac Sign:</label>
              <input
                type="text"
                id="zodiacSign"
                value={formData.zodiacSign}
                onChange={e => setFormData({ ...formData, zodiacSign: e.target.value })}
              />
            </div>
            <div className="profile-section">
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                rows="4"
              ></textarea>
            </div>
            <div className="profile-section">
              <label htmlFor="avatar">Avatar:</label>
              <input
                type="file"
                id="avatar"
                onChange={e => setFormData({ ...formData, avatar: e.target.files[0] })}
              />
            </div>
            <button className="edit-profile-button" type="submit">Save</button>
          </form>
        ) : (
          profileExists && (
            <button className="edit-profile-button" onClick={handleEdit}>Edit Profile</button>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
