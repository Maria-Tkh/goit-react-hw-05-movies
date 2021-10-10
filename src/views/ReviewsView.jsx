import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../services/api';
import MovieReviews from 'components/MovieReviews/MovieReviews';
import { NotFoundReviews } from './NotFoundInfoView';
import Spinner from 'components/Loader/Loader';
import PropTypes from 'prop-types';

export default function ReviewsView({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [requestStatus, setRequestStatus] = useState('idle');

  useEffect(() => {
    setRequestStatus('pending');
    fetchMovieReviews(movieId)
      .then(response => {
        setReviews(response.results);
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
      {reviews.length !== 0 ? <MovieReviews reviews={reviews} /> : <NotFoundReviews />}
    </>
  );
}

ReviewsView.propTypes = {
  movieId: PropTypes.string.isRequired,
};
