import React from 'react';
import { ArticleContextProvider } from './context/ArticleContext';
import Filters from './components/Filters';
import ArticleList from './components/ArticleList';
import "./App.css"

const App = () => {
  return (
    <ArticleContextProvider>
      <div className="app-container">
        <Filters />
        <ArticleList />
      </div>
    </ArticleContextProvider>
  );
};

export default App;