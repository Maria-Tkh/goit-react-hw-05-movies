import { defaultActorPhotoURL } from 'views/NotFoundInfoView';
import PropTypes from 'prop-types';
import styles from './MovieCast.module.css';

export default function MovieCast({ cast }) {
  return (
    <ul className={styles.castList}>
      {cast.map(actor => (
        <li className={styles.actorCard} key={actor.id}>
          <img
            src={
              actor.profile_path !== null
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : defaultActorPhotoURL
            }
            alt={actor.name}
          />
          <p className={styles.actorName}>{actor.name}</p>
          <p className={styles.character}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

MovieCast.propTypes = {
  cast: PropTypes.arrayOf(PropTypes.object).isRequired,
};
