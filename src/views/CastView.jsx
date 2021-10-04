import { useState, useEffect } from 'react';
import { fetchMovieCredits } from '../services/api';

export const CastView = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId)
      .then(response => {
        setCast(response.cast);
      })
      .catch(error => {
        console.log(error);
      });
  }, [movieId]);

  console.log(cast);
  console.log(movieId);
  return (
    <>
      <p>cast</p>
      <>
        <ul>
          {cast !== [] &&
            cast.map(actor => (
              <li key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
                <p>{actor.character}</p>
              </li>
            ))}
        </ul>
      </>
    </>
  );
};
