import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../services/api';

export const ReviewsView = ({ movieId }) => {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId).then(response => {
      setReviews(response.results);
    });
  }, [movieId]);

  console.log(reviews);

  return (
    <>
      <p>Reviews</p>;<></>
    </>
  );
};
