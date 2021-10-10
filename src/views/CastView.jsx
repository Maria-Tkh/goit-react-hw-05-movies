import { useState, useEffect } from 'react';
import { fetchMovieCredits } from '../services/api';
import MovieCast from 'components/MovieCast/MovieCast';
import { NotFoundCast } from './NotFoundInfoView';
import Spinner from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export default function CastView({ movieId }) {
  const [cast, setCast] = useState([]);
  const [requestStatus, setRequestStatus] = useState('idle');

  useEffect(() => {
    setRequestStatus('pending');
    fetchMovieCredits(movieId)
      .then(response => {
        setCast(response.cast);
        setRequestStatus('resolved');
      })
      .catch(error => {
        setRequestStatus('rejected');
        console.log(error);
      });
  }, [movieId]);

  const isLoading = requestStatus === 'pending';

  return (
    <>
      {isLoading && <Spinner />}
      {cast.length !== 0 ? <MovieCast cast={cast} /> : <NotFoundCast />}
    </>
  );
}

CastView.propTypes = {
  movieId: PropTypes.string.isRequired,
};
