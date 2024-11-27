import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: 'Understanding Zodiac Compatibility',
      content: `
        When it comes to relationships, love, and attraction, we often turn to the stars to uncover the mysteries of human connection. Whether you're a fiery Aries or a peaceful Pisces, your zodiac sign might hold the key to understanding how you relate to others — especially in love. But does your sign really determine your compatibility with others, or is it all just cosmic nonsense? Let’s explore the enchanting world of zodiac compatibility and uncover how the stars might actually influence the way we connect.
        
        <h2>The Basics: The 12 Zodiac Signs and Their Elements</h2>
        <p>Before we dive into the mystical world of compatibility, it's important to understand the elemental influences of the zodiac signs...</p>
      `,
    },
    {
      id: 2,
      title: 'The Art of Astrology Dating',
      content: `
        Astrology can offer unique insights into your love life. Here are some tips on finding love through astrology...
      `,
    },
    {
      id: 3,
      title: 'Best Practices for Online Zodiac Dating',
      content: `
        Online zodiac dating can be a fun and safe way to meet like-minded individuals. Here are some best practices...
      `,
    },
  ];

  const handleCardClick = (article) => {
    navigate('/article', { state: article }); // Passing article data to the new page
  };

  return (
    <div className="home-container">
      <div className="welcome-banner">
        <h1>Welcome to Zodiac Connect</h1>
        <p>Discover love through the stars. Connect with people who share your zodiac sign and explore compatibility!</p>
        <button className="get-started-button">Get Started</button>
      </div>
      <div className="content-section">
        {articles.map((article) => (
          <div
            key={article.id}
            className="content-card"
            onClick={() => handleCardClick(article)}
          >
            <h2>{article.title}</h2>
            <p>{article.content.substring(0, 100)}...</p> {/* Display first 100 characters */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
