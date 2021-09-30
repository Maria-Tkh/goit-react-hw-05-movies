import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchPopularMovies } from '../services/api';
import { PageHeading } from '../components/PageHeading/PageHeading';
// import { MovieDetailsView } from "./MovieDetailsView";

export const HomeView = () => {
  const match = useRouteMatch();
  const [movieList, setMovieList] = useState(null);
  console.log(match);

  useEffect(() => {
    fetchPopularMovies().then(response => {
      setMovieList(response.results);
    });
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />

      {movieList && (
        <ul>
          {movieList.map(movie => (
            <li key={movie.id}>
              <Link to={`/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
