import { useState, useEffect } from 'react';
import { fetchPopularMovies } from '../services/api';
import PageHeading from '../components/PageHeading/PageHeading';
import Spinner from 'components/Loader/Loader';
import MovieList from 'components/MovieList/MovieList';

export default function HomeView() {
  const [movieList, setMovieList] = useState(null);
  const [requestStatus, setRequestStatus] = useState('idle');

  useEffect(() => {
    setRequestStatus('pending');
    fetchPopularMovies()
      .then(response => {
        setMovieList(response.results);
        setRequestStatus('resolved');
      })
      .catch(error => {
        setRequestStatus('rejected');
        console.log(error);
      });
  }, []);

  const isLoading = requestStatus === 'pending';

  return (
    <>
      <PageHeading text="Trending today" />
      {isLoading && <Spinner />}
      {movieList && <MovieList movieList={movieList} />}
    </>
  );
}
