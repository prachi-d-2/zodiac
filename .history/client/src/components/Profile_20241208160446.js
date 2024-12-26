import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [bio, setBio] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setBio(response.data.bio || '');
        setZodiacSign(response.data.zodiacSign || '');
      } catch (error) {
        console.error('Error loading profile:', error.message);
        setMessage('Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('bio', bio);
      formData.append('zodiacSign', zodiacSign);
      if (avatar) formData.append('avatar', avatar);

      const token = localStorage.getItem('token');
      const response = await axios.put('/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(response.data.user);
      setMessage('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setMessage('Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div>
          <label>Zodiac Sign:</label>
          <input
            type="text"
            value={zodiacSign}
            onChange={(e) => setZodiacSign(e.target.value)}
          />
        </div>
        <div>
          <label>Avatar:</label>
          <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
      {profile.avatar && <img src={`/${profile.avatar}`} alt="Avatar" />}
    </div>
  );
};

export default Profile;
