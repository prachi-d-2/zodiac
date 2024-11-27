import React from 'react';
import { useParams } from 'react-router-dom';
import articles from '../articles'; // Import the articles array

function ArticlePage() {
  const { id } = useParams(); // Get the article ID from the URL
  const article = articles.find((article) => article.id === parseInt(id)); // Find the article by ID

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
