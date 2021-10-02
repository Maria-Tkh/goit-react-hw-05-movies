import { useState, useEffect } from 'react';
import { useParams, useRouteMatch, Link, Route } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import { CastView } from './CastView';
import { ReviewsView } from './ReviewsView';

export const MovieDetailsView = () => {
  const { movieId } = useParams();
  console.log(movieId);
  const { url } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  console.log(url);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  console.log(movie);

  return (
    <>
      <button>Go back</button>
      <br />
      {movie && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
            alt={movie.original_title}
          />
          <h2>
            {movie.original_title} ({movie.release_date.substring(0, 4)})
          </h2>
          <p>User Score: {movie.vote_average * 10}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
          <hr />
          <p>Additional information</p>
          <ul>
            <li>
              <Link to={`${url}/cast`}>Cast</Link>

              <Route path={`${url}/cast`}>
                <CastView />
              </Route>
            </li>
            <li>
              <Link to={`${url}/reviews`}>Reviews</Link>

              <Route path={`${url}/reviews`}>
                <ReviewsView />
              </Route>
            </li>
          </ul>
          <hr />
        </>
      )}
    </>
  );
};
