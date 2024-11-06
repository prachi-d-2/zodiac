import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', avatar: '' });

  useEffect(() => {
    axios.get('/api/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => setProfile(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setFormData({ username: profile.username, email: profile.email, avatar: profile.avatar });
  };

  const handleSave = () => {
    axios.put('/api/profile', formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        setProfile(response.data);
        setEditMode(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h2>{editMode ? 'Edit Profile' : 'Your Profile'}</h2>
        {editMode ? (
          <div>
            <input
              type="text"
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
            />
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="text"
              value={formData.avatar}
              onChange={e => setFormData({ ...formData, avatar: e.target.value })}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <img src={profile.avatar} alt="Avatar" />
            <button onClick={handleEdit}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
