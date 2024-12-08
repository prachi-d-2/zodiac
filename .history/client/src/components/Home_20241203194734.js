import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import articles from '../data/articles'; // Import articles from a centralized file
import PageTransition from './PageTransition'; // Ensure the correct path is used

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
    <PageTransition>
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
              {/* Display first 100 characters of the article content */}
              <p>{article.content.replace(/<[^>]+>/g, '').slice(0, 100)}...</p>
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
    </PageTransition>
  );
}

export default Home;
