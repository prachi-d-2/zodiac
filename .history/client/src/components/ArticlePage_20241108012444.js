// client/src/components/ArticlePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function ArticlePage() {
  const location = useLocation();
  const { title, content } = location.state || {}; // Using location.state to pass data

  if (!title || !content) {
    return <div>Article not found</div>;
  }

  return (
    <div className="article-container">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}

export default ArticlePage;
