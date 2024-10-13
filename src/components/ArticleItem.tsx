import React from 'react';

interface ArticleProps {
  article: {
    id: number;
    title: string;
    url: string;
    image: string;
    date: string;
    body: string;
    source: string;
    author: string;
  };
}

const ArticleItem: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div className="article-item">
      <img src="/default.jpeg" alt={article.title} className="article-image" />
      <div className="article-details">
        <span className="article-date">{new Date(article.date).toLocaleDateString()}</span>
        <h3 className="article-title" dangerouslySetInnerHTML={{__html: article.title}}></h3>
        <div className="article-body" dangerouslySetInnerHTML={{__html: article.body}}></div>
        <div className="article-meta">
          <span>{article.author}</span> | <span>{article.source}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;