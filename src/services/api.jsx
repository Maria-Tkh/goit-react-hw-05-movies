const API_KEY = '022c4c0fe946d80e6f1ac32e6f44ebf0';
const BASE_URL = 'https://api.themoviedb.org/3/';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok ? await response.json() : Promise.reject(new Error('Not found'));
}

export function fetchPopularMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );
}

export function fetchMovieDetails(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`);
}

export function fetchMovieCredits(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
}

export function fetchQuery(query, page) {
  return fetchWithErrorHandling(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&per_page=10&page=${page}&include_adult=false&query=${query}`,
  );
}
