import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { fetchQuery } from '../services/api';

export const MoviesView = () => {
  const [query, setQuery] = useState('');
  const [movieListQuery, setMovieListQuery] = useState([]);
  const [page, setPage] = useState(1);

  const handleFormSubmit = query => {
    setQuery(query);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    query !== null &&
      fetchQuery(query, page)
        .then(response => {
          setMovieListQuery(response.results);
        })
        .catch(error => {
          console.log(error);
        });
  }, [query, page]);

  console.log(movieListQuery.length);

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
      {movieListQuery.length > 19 && <Button handleLoadMore={handleLoadMore} />}
    </>
  );
};
