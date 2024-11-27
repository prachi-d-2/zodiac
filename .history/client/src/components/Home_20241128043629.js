import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import articles from '../data/articles'; // Import articles from a centralized file

function Home() {
  const [loadedArticles, setLoadedArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching articles (replace with API call if needed)
    setLoadedArticles(articles); // Load articles from data/articles.js
  }, []);

  const handleReadMore = (article) => {
    navigate(`/article/${article.id}`, { state: article }); // Pass full article data in route state
  };

  return (
    <div className="home-container">
      <div className="welcome-banner">
        <h1>Welcome to Zodiac Connect</h1>
        <p>Discover love through the stars. Connect with people who share your zodiac sign and explore compatibility!</p>
        <button className="get-started-button">Get Started</button>
      </div>
      <div className="content-section">
        {loadedArticles.map((article) => (
          <div key={article.id} className="content-card">
            <h2>{article.title}</h2>
            <p>{article.content.replace(/<[^>]+>/g, '').slice(0, 100)}...</p> {/* Display first 100 characters */}
            <button
              className="read-more-button"
              onClick={() => handleReadMore(article)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
