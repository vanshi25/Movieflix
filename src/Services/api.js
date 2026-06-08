const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/* HOME */

export const getTrendingMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
  );
  return await res.json();
};

export const getTopRatedMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
  );
  return await res.json();
};

export const getBollywoodMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc&page=${page}`
  );
  return await res.json();
};

export const getKoreanMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ko&sort_by=popularity.desc&page=${page}`
  );
  return await res.json();
};

export const getJapaneseMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ja&sort_by=popularity.desc&page=${page}`
  );
  return await res.json();
};
export const getHollywoodActionMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&with_genres=28&page=${page}`
  );
  return await res.json();
};

export const getHollywoodRomanceMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&with_genres=10749&page=${page}`
  );
  return await res.json();
};

export const getHollywoodHorrorMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&with_genres=27&page=${page}`
  );
  return await res.json();
};

export const getHollywoodComedyMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&with_genres=35&page=${page}`
  );
  return await res.json();
};
export const getBollywoodTopRatedMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=vote_average.desc&vote_count.gte=100&page=${page}`
  );
  return await res.json();
};

export const getBollywoodActionMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&with_genres=28&page=${page}`
  );
  return await res.json();
};

export const getBollywoodRomanceMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&with_genres=10749&page=${page}`
  );
  return await res.json();
};

export const getBollywoodComedyMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&with_genres=35&page=${page}`
  );
  return await res.json();
};
export const getKoreanTopRatedMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ko&sort_by=vote_average.desc&vote_count.gte=100&page=${page}`
  );
  return await res.json();
};

export const getKoreanDramaMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ko&with_genres=18&page=${page}`
  );
  return await res.json();
};

export const getKoreanThrillerMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ko&with_genres=53&page=${page}`
  );
  return await res.json();
};

export const getJapaneseTopRatedMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ja&sort_by=vote_average.desc&vote_count.gte=100&page=${page}`
  );
  return await res.json();
};

export const getJapaneseAnimeMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ja&with_genres=16&page=${page}`
  );
  return await res.json();
};

export const getJapaneseActionMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ja&with_genres=28&page=${page}`
  );
  return await res.json();
};

export const getJapaneseDramaMovies = async (page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ja&with_genres=18&page=${page}`
  );
  return await res.json();
};
export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
};


export const searchMulti = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
  );

  return response.json();
};

export const getMoviesByYear = async (year) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`
  );

  return response.json();
};

export const searchPerson = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`
  );

  return response.json();
};
export const getPersonMovies = async (personId) => {
  const response = await fetch(
    `${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}`
  );

  return response.json();
};
export const discoverMoviesByGenres = async (
  genres,
  language = ""
) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres}&with_original_language=${language}&sort_by=popularity.desc`
  );

  return response.json();
};

export const getSimilarMovies = async (
  movieId
) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
  );

  return response.json();
};