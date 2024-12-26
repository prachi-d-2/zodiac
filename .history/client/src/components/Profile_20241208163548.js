import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ zodiacSign: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError('No user found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setProfile(userDoc.data());
          setFormData({
            zodiacSign: userDoc.data().zodiacSign || '',
            bio: userDoc.data().bio || '',
          });
        } else {
          setError('User profile not found.');
        }
        setLoading(false);
      } catch (error) {
        setError('Failed to load profile.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError('No user found. Please log in again.');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        zodiacSign: formData.zodiacSign,
        bio: formData.bio,
      });

      setProfile({ ...profile, ...formData });
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
            <button className="edit-profile-button" type="submit">Save</button>
          </form>
        ) : (
          <button className="edit-profile-button" onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Profile;
