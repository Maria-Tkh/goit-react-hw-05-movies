import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import { PageHeading } from '../components/PageHeading/PageHeading';

export const MovieDetailsView = () => {
  const { movieId } = useParams();
  console.log(movieId);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      <PageHeading text={`Movie ${movieId}`} />

      {movie && (
        <>
          <img src={movie.backdrop_path} alt={movie.original_title} />
          <h2>
            {movie.original_title} ({movie.release_date})
          </h2>
          <p>User Score: {movie.vote_average}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.name}</p>
        </>
      )}
    </>
  );
};
