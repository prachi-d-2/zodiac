import React from 'react';
import { useLocation } from 'react-router-dom';

function ArticlePage() {
  const location = useLocation();
  const article = location.state; // Retrieve the article passed from Home.js

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
