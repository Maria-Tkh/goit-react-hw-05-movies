import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import Spinner from 'components/Loader/Loader';
// import HomeView  from 'views/HomeView';
// import  MoviesView  from 'views/MoviesView';
// import  NotFoundView  from './views/NotFoundView';
// import  MovieDetailsView  from './views/MovieDetailsView';

const HomeView = lazy(() => import('./views/HomeView.jsx' /* webpackChunkName: "home-view" */));
const MoviesView = lazy(() =>
  import('./views/MoviesView.jsx' /* webpackChunkName: "movies-view" */),
);
const MovieDetailsView = lazy(() =>
  import('./views/MovieDetailsView.jsx' /* webpackChunkName: "movie-details-view" */),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView.jsx' /* webpackChunkName: "not-found-view" */),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
