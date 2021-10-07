import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movieList }) {
  const location = useLocation();
  console.log('MovieList', location);
  return (
    <ul>
      {movieList.map(movie => (
        <li key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: {
                from: location,
              },
            }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
