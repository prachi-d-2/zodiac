// client/src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login-register');
  };

  return (
    <div className="home-container">
      <div className="welcome-banner">
        <h1>Welcome to Zodiac Connect</h1>
        <p>Discover love through the stars. Connect with people who share your zodiac sign and explore compatibility!</p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      <div className="content-section">
        <div className="content-card">
          <h2>Understanding Zodiac Compatibility</h2>
          <p>Learn how zodiac signs influence relationships.</p>
        </div>
        <div className="content-card">
          <h2>The Art of Astrology Dating</h2>
          <p>Tips and tricks for finding love through astrology.</p>
        </div>
        <div className="content-card">
          <h2>Best Practices for Online Zodiac Dating</h2>
          <p>Stay safe and make the most of your connections.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
