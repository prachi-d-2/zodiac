import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ zodiacSign: '', bio: '', avatar: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setFormData({
          zodiacSign: response.data.zodiacSign || '',
          bio: response.data.bio || '',
          avatar: response.data.avatar || '',
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to load profile.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('bio', formData.bio);
    if (formData.avatar instanceof File) {
      data.append('avatar', formData.avatar);
    }
    if (formData.zodiacSign) {
      data.append('zodiacSign', formData.zodiacSign);
    }

    try {
      const response = await axios.put('/api/profile', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(response.data);
      setEditMode(false);
      setError(null);
    } catch (error) {
      setError('Failed to save profile.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={profile.avatar || 'default-avatar.png'} alt="Avatar" className="profile-avatar" />
        <div className="profile-details">
          <h2>{profile.username}</h2>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Zodiac Sign:</strong> {profile.zodiacSign || 'Not provided'}</p>
          <p><strong>Bio:</strong> {profile.bio || 'No bio provided'}</p>
        </div>
      </div>
      <div>
        <h2>{editMode ? 'Edit Profile' : 'Your Profile'}</h2>
        {editMode ? (
          <form onSubmit={handleSave}>
            <div className="profile-section">
              <label htmlFor="zodiacSign">Zodiac Sign:</label>
              <input
                type="text"
                id="zodiacSign"
                value={formData.zodiacSign}
                onChange={(e) => setFormData({ ...formData, zodiacSign: e.target.value })}
              />
            </div>
            <div className="profile-section">
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows="4"
              />
            </div>
            <div className="profile-section">
              <label htmlFor="avatar">Avatar:</label>
              <input
                type="file"
                id="avatar"
                onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
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
