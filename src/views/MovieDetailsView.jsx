import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useRouteMatch, useLocation, useHistory, Link, Route } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
// import  CastView  from './CastView';
// import  ReviewsView  from './ReviewsView';
import Spinner from 'components/Loader/Loader';

const CastView = lazy(() =>
  import('./CastView.jsx' /* webpackChunkName: "movie-details-cast-view" */),
);
const ReviewsView = lazy(() =>
  import('./ReviewsView.jsx' /* webpackChunkName: "movie-details-cast-reviews-view" */),
);

export default function MovieDetailsView() {
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const [requestStatus, setRequestStatus] = useState('idle');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setRequestStatus('pending');
    fetchMovieDetails(movieId)
      .then(response => {
        setMovie(response);
        setRequestStatus('resolved');
      })
      .catch(error => {
        setRequestStatus('rejected');
        console.log(error);
      });
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from);
  };

  console.log('MovieDetailsView history', history);

  // console.log('MovieDetailsView', history.state);

  const isLoading = requestStatus === 'pending';

  return (
    <>
      <button type="button" onClick={onGoBack}>
        Go back
      </button>
      <br />
      {isLoading && <Spinner />}
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
              <Link
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    from: location,
                  },
                }}
              >
                Cast
              </Link>
              <Suspense fallback={<Spinner />}>
                <Route path={`${url}/cast`}>
                  <CastView movieId={movieId} />
                </Route>
              </Suspense>
            </li>
            <li>
              <Link
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    from: location,
                    // from: location.state.from
                  },
                }}
              >
                Reviews
              </Link>
              <Suspense fallback={<Spinner />}>
                <Route path={`${url}/reviews`}>
                  <ReviewsView movieId={movieId} />
                </Route>
              </Suspense>
            </li>
          </ul>
          <hr />
        </>
      )}
    </>
  );
}
