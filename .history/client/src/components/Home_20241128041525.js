import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import articles from '../articles';

function Home() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching articles. Replace with your API call or data fetching logic.
    const fetchArticles = async () => {
      const mockArticles = [
        {
          id: 1,
          title: 'Understanding Zodiac Compatibility',
          content: '<p>Learn how zodiac signs influence relationships and your love life. Explore deeper insights...</p>',
        },
        {
          id: 2,
          title: 'The Art of Astrology Dating',
          content: '<p>Discover tips and tricks for finding love through astrology. Uncover secrets of compatibility...</p>',
        },
        {
          id: 3,
          title: 'Best Practices for Online Zodiac Dating',
          content: '<p>Stay safe and make the most of your connections. Learn essential online dating tips...</p>',
        },
      ];
      setArticles(mockArticles);
    };

    fetchArticles();
  }, []);

  const handleReadMore = (article) => {
    navigate(`/article/${article.id}`, { state: article });
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
