import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../services/api';

export const ReviewsView = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then(response => {
        setReviews(response.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);

  console.log(reviews);

  return (
    <>
      <p>Reviews</p>
      <>
        <ul>
          {reviews !== [] &&
            reviews.map(review => (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))}
        </ul>
      </>
    </>
  );
};
