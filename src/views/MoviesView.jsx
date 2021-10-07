import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Searchbar from 'components/Searchbar/Searchbar';
import Spinner from 'components/Loader/Loader';
import MovieList from 'components/MovieList/MovieList';
import { NotFoundMovies } from './NotFoundInfoView';
import { fetchQuery } from '../services/api';

export default function MoviesView() {
  const [query, setQuery] = useState('');
  const [movieList, setMovieList] = useState(null);
  const [requestStatus, setRequestStatus] = useState('idle');
  const history = useHistory();
  const location = useLocation();

  const handleFormSubmit = query => {
    setQuery(query);
  };

  // const onChangeQuery = () => {
  //   history.push({
  //     ...location,
  //     search: `query=${query}`,
  //   });
  // }

  const changeQuery = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (location.search !== '') {
      return;
    }
    history.push({ ...location, search: `query=${query}` });
  }, [history, location, query]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    query !== null && setRequestStatus('pending');
    fetchQuery(query)
      .then(response => {
        setMovieList(response.results);
        setRequestStatus('resolved');
      })
      .catch(error => {
        setRequestStatus('rejected');
        console.log(error);
      });
  }, [query]);

  const isLoading = requestStatus === 'pending';
  const loaded = requestStatus === 'resolved';

  return (
    <>
      <Searchbar onSearch={handleFormSubmit} value={changeQuery} />
      {isLoading && <Spinner />}
      {loaded && movieList.length === 0 && <NotFoundMovies />}
      {
        movieList && <MovieList movieList={movieList} />
        // (
        // <ul>
        //   {movieList.map(movie => (
        //     <li key={movie.id}>
        //       <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        //     </li>
        //   ))}
        // </ul>
        // )
      }
    </>
  );
}
