import React, { useContext } from 'react';
import { ArticleContext } from '../context/ArticleContext';

const Filters: React.FC = () => {
  const articleContext = useContext(ArticleContext);

  if (!articleContext) return null;

  const { filters, setFilters, categories, authors } = articleContext;

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((cat) => cat !== category)
        : [...prev.category, category],
    }));
  };

  const handleAuthorChange = (author: string) => {
    setFilters((prev) => ({
      ...prev,
      author: prev.author.includes(author)
        ? prev.author.filter((auth) => auth !== author)
        : [...prev.author, author],
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: e.target.value as 'date' | 'title',
    }));
  };

  return (
    <div className="filters">
      <h3>Category</h3>
      {categories.map((cat, index)=> {
        return <React.Fragment key={index}> <input key={index}
        id={cat}
        name={cat}
        type="checkbox"
        onChange={() => handleCategoryChange(cat)}
        checked={filters.category.includes(cat)}
      />
      <label form={cat}> {cat}</label><br/>
      </React.Fragment>
      })}

      <h3>Author</h3>
      {authors.map((author, index)=>{
        return <React.Fragment key={index}> <input key={index}
        id={author}
        name={author}
        type="checkbox"
        onChange={() => handleAuthorChange(author)}
        checked={filters.author.includes(author)}
      />
      <label form={author}> {author}</label><br/>
      </React.Fragment>
      })}

      <h3>Sort By</h3>
      <select onChange={handleSortChange} value={filters.sortBy}>
        <option value="date">Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default Filters;