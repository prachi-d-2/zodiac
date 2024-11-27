import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    zodiacSign: '',
    bio: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewProfile, setIsNewProfile] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.data && Object.keys(response.data).length === 0) {
          setIsNewProfile(true);
        } else {
          setProfile(response.data);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle Edit button click
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

  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('zodiacSign', formData.zodiacSign);
    data.append('bio', formData.bio);
    if (formData.avatar instanceof File) {
      data.append('avatar', formData.avatar);
    }

    try {
      const method = isNewProfile ? 'post' : 'put';
      const response = await axios({
        method,
        url: '/api/profile',
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setProfile(response.data);
      setEditMode(false);
      setIsNewProfile(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to save profile.');
    }
  };

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  if (loading) return <p>Loading...</p>;

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
        <h2>{editMode || isNewProfile ? 'Create/Edit Profile' : 'Your Profile'}</h2>
        {editMode || isNewProfile ? (
          <form onSubmit={handleSave}>
            <div className="profile-section">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="profile-section">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="profile-section">
              <label htmlFor="zodiacSign">Zodiac Sign:</label>
              <input
                type="text"
                id="zodiacSign"
                name="zodiacSign"
                value={formData.zodiacSign}
                onChange={handleChange}
              />
            </div>

            <div className="profile-section">
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="profile-section">
              <label htmlFor="avatar">Avatar:</label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleChange}
              />
            </div>

            <button className="edit-profile-button" type="submit">Save</button>
          </form>
        ) : (
          <button className="edit-profile-button" onClick={handleEdit}>Edit Profile</button>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Profile;

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  zodiacSign: { type: String, required: false },
  bio: { type: String, required: false },
  avatar: { type: String, required: false }, // Store avatar URL or path
}, { timestamps: true });

const ProfileModel = mongoose.model('Profile', profileSchema);
module.exports = ProfileModel;
