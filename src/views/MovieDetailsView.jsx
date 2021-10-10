import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useRouteMatch, useLocation, useHistory, Route, Switch } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import MovieDetails from 'components/MovieDetails/MovieDetails';
import GoBackButton from 'components/GoBackButton/GoBackButton';
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

  const isLoading = requestStatus === 'pending';

  return (
    <>
      {<GoBackButton onClick={onGoBack} />}
      <br />
      {isLoading && <Spinner />}
      {movie && <MovieDetails movie={movie} />}

      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path={`${url}/cast`}>
            <CastView movieId={movieId} />
          </Route>

          <Route path={`${url}/reviews`}>
            <ReviewsView movieId={movieId} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
