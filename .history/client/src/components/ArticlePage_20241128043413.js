import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import articles from '../data/articles';

function ArticlePage() {
  const location = useLocation();
  const { id } = useParams();

  // Use the article passed via `state`, or fallback to fetching it by ID
  const article = location.state || articles.find((a) => a.id === parseInt(id, 10));

  if (!article) {
    return <p>Article not found. Please go back to the home page.</p>;
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}

export default ArticlePage;
