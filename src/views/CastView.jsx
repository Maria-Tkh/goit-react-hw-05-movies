import { useState, useEffect } from 'react';
import { fetchMovieCredits } from '../services/api';
import { useLocation, useHistory } from 'react-router-dom';

export default function CastView({ movieId }) {
  const [cast, setCast] = useState([]);
  const history = useHistory();
  const location = useLocation();
  console.log('Cast location', location);
  console.log('Cast history', history);

  useEffect(() => {
    fetchMovieCredits(movieId)
      .then(response => {
        setCast(response.cast);
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);

  return (
    <>
      <ul>
        {cast !== [] &&
          cast.map(actor => (
            <li key={actor.id}>
              <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
