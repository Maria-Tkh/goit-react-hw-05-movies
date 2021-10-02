import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../services/api';

export const ReviewsView = ({ movieId }) => {
  const [reviews, setReviews] = useState(null);

  // useEffect(() => {
  //   fetchMovieReviews(movieId).then(response => {
  //     setReviews(response.results);
  //   });
  // }, [movieId]);

  console.log(reviews);

  return (
    <>
      <p>Reviews</p>;
      <>
        <ul>
          {reviews !== [] &&
            reviews.map(review => (
              <li key={review.id}>
                <h3>Author: {review.results.author}</h3>
                <p>{review.results.content}</p>
              </li>
            ))}
        </ul>
      </>
    </>
  );
};
