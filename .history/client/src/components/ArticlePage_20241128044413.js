import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import articles from '../data/articles';
import './ArticlePage.css';

function ArticlePage() {
  const location = useLocation();
  const { id } = useParams();

  // Use the state if available, otherwise find the article by ID
  const article = location.state || articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return <p>Article not found. Please go back to the home page.</p>;
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: article.content }} // Render the full HTML content
      />
    </div>
  );
}

export default ArticlePage;
