import React from 'react';
import { useLocation } from 'react-router-dom';

function ArticlePage() {
  const location = useLocation();
  const article = location.state;

  if (!article) {
    return <p>No article data found. Please navigate from the home page.</p>;
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}

export default ArticlePage;
