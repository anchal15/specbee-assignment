import React, { createContext, useState, useEffect } from 'react';
import {API_URL } from "../constant"

// Define Article type
interface Article {
  id: number;
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
}

// Define Filters type
interface Filters {
  category: string[];
  author: string[];
  sortBy: 'date' | 'title';
}

// Define Context type
interface ArticleContextType {
  filteredArticles: Article[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  loading: boolean;
  categories: string[];
  authors: string[];
}

export const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    category: [],
    author: [],
    sortBy: 'date',
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(API_URL);
        const data: Article[] = await response.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    if (filters.category.length > 0) {
      filtered = filtered.filter((article) =>
        filters.category.includes(article.source)
      );
    }

    if (filters.author.length > 0) {
      filtered = filtered.filter((article) =>
        filters.author.includes(article.author)
      );
    }

    filtered = filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

    setFilteredArticles(filtered);
  }, [filters, articles]);

  useEffect(()=> {
    let categories: string[] = [];
    articles.forEach(a=>{
        categories.push(a.source)
    })

    setCategories(categories.filter((cat, index)=> categories.indexOf(cat)===index));

    let authors: string[] = [];
    articles.forEach(a=>{
        authors.push(a.author)
    })

    setAuthors(authors.filter((author, index)=> authors.indexOf(author)===index));


  }, [articles])

  return (
    <ArticleContext.Provider
      value={{ filteredArticles, filters, setFilters, loading, categories, authors }}>
      {children}
    </ArticleContext.Provider>
  );
};