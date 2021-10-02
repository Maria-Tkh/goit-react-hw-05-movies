import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../services/api';
// import { Link, Route, useRouteMatch } from "react-router-dom"

export const CastView = ({ movieId }) => {
  // const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId).then(response => {
      setCast(response.results);
    });
  }, [movieId]);

  console.log(cast);
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