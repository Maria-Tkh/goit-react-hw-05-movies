import { useRouteMatch, useLocation, NavLink } from 'react-router-dom';
import { defaultFilmPosterURL } from 'views/NotFoundInfoView';
import PropTypes from 'prop-types';
import styles from './MovieDetails.module.css';

export default function MovieDetails({ movie }) {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <div className={styles.movieWrapper}>
        <div className={styles.posterWrapper}>
          <img
            className={styles.moviePoster}
            src={
              movie.backdrop_path !== null
                ? `https://image.tmdb.org/t/p/w400${movie.backdrop_path}`
                : defaultFilmPosterURL
            }
            alt={movie.original_title}
          />
        </div>
        <div className={styles.movieInfo}>
          <h2 className={styles.movieTitle}>
            {movie.original_title} ({movie.release_date.substring(0, 4)})
          </h2>
          <p>User Score: {movie.vote_average * 10}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <hr />
      <p className={styles.addInfo}>Additional information</p>
      <ul className={styles.linkList}>
        <li>
          <NavLink
            className={styles.link}
            activeClassName={styles.activeLink}
            to={{
              pathname: `${url}/cast`,
              state: {
                from: location.state.from,
              },
            }}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.link}
            activeClassName={styles.activeLink}
            to={{
              pathname: `${url}/reviews`,
              state: {
                from: location.state.from,
              },
            }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <hr />
    </>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.object.isRequired,
};
