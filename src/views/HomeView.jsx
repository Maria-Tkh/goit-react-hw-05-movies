import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchPopularMovies } from '../services/api';
import { PageHeading } from '../components/PageHeading/PageHeading';

export const HomeView = () => {
  const match = useRouteMatch();
  const [movieList, setMovieList] = useState(null);
  // const [requestStatus, setRequestStatus] = useState('idle');
  console.log(match);

  useEffect(() => {
    // setRequestStatus('pending');
    fetchPopularMovies()
      .then(response => {
        setMovieList(response.results);
        // setRequestStatus('resolved');
      })
      .catch(error => {
        // setRequestStatus('rejected');
        console.log(error);
      });
  }, []);

  // const isLoading = requestStatus === 'pending';
  // const showMovieList = movieList.length > 0 && !isLoading;

  return (
    <>
      <PageHeading text="Trending today" />

      {movieList && (
        <ul>
          {movieList.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
