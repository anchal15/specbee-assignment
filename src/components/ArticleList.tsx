import React, { useContext } from 'react';
import { ArticleContext } from '../context/ArticleContext';
import ArticleItem from './ArticleItem';
import Loader from './Loader';

const ArticleList: React.FC = () => {
  const articleContext = useContext(ArticleContext);

  if (!articleContext) return null;

  const { filteredArticles, loading } = articleContext;

  if (loading) return <Loader />;

  return (
    <div className="article-list">
      {filteredArticles.map((article, index) => (
        <ArticleItem key={index} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;