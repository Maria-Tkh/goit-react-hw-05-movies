import PropTypes from 'prop-types';
import styles from './MovieReviews.module.css';

export default function MovieReviews({ reviews }) {
  return (
    <ul className={styles.reviewList}>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};
