import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieList.module.css';

export default function MovieList({ movieList }) {
  const location = useLocation();
  console.log('MovieList', location);
  return (
    <ul className={styles.list}>
      {movieList.map(movie => (
        <li key={movie.id}>
          <Link
            className={styles.movie}
            to={{
              pathname: `/movies/${movie.id}`,
              state: {
                from: location,
              },
            }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movieList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
