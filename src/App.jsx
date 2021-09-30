import { Switch, Route } from 'react-router-dom';
import { AppBar } from './components/AppBar/AppBar';
import { Container } from './components/Container/Container';
import { HomeView } from 'views/HomeView';
import { MoviesView } from 'views/MoviesView';
import { NotFoundView } from './views/NotFoundView';
import { MovieDetailsView } from './views/MovieDetailsView';
export const App = () => {
  return (
    <Container>
      <AppBar />
      <Switch>
        <Route path="/">
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
    </Container>
  );
};
