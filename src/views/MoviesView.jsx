import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchQuery } from '../services/api';

export const MoviesView = () => {
  const [query, setQuery] = useState('');
  const [movieListQuery, setMovieListQuery] = useState(null);

  const handleFormSubmit = query => {
    setQuery(query);
  };

  useEffect(() => {
    fetchQuery(query).then(response => {
      setMovieListQuery(response.results);
    });
  }, [query]);

  return (
    <>
      <Searchbar onSearch={handleFormSubmit} />

      {movieListQuery && (
        <ul>
          {movieListQuery.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
