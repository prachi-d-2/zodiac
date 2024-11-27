import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching articles from `data/articles.js`
    setLoadedArticles(articles);
  }, []);

  const handleReadMore = (article) => {
    navigate(`/article/${article.id}`, { state: article }); // Pass the article data in the route state
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
          <div key={article.id} className="content-card">
            <h2>{article.title}</h2>
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
  );
}

export default Home;
