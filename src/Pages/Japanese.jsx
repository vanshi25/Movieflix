import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import HeroBanner from "../Components/HeroBanner";
import Loader from "../Components/Loader";
import {
  getJapaneseMovies,
  getJapaneseTopRatedMovies,
  getJapaneseAnimeMovies,
  getJapaneseActionMovies,
  getJapaneseDramaMovies,
} from "../Services/api";

import "./CategoryPage.css";

function Japanese() {
  const [heroMovie, setHeroMovie] =
    useState(null);

  const [movies, setMovies] =
    useState([]);

  const [topRatedMovies,
    setTopRatedMovies] =
    useState([]);

  const [animeMovies,
    setAnimeMovies] =
    useState([]);

  const [actionMovies,
    setActionMovies] =
    useState([]);

  const [dramaMovies,
    setDramaMovies] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const japaneseData =
        await getJapaneseMovies();

      const topRatedData =
        await getJapaneseTopRatedMovies();

      const animeData =
        await getJapaneseAnimeMovies();

      const actionData =
        await getJapaneseActionMovies();

      const dramaData =
        await getJapaneseDramaMovies();

      setMovies(
        japaneseData.results || []
      );

      setTopRatedMovies(
        topRatedData.results || []
      );

      setAnimeMovies(
        animeData.results || []
      );

      setActionMovies(
        actionData.results || []
      );

      setDramaMovies(
        dramaData.results || []
      );

      const heroCandidates = [

        ...(animeData.results || [])
          .slice(0, 8),

        ...(topRatedData.results || [])
          .slice(0, 4),

      ].filter(
        (movie) =>
          movie &&
          movie.backdrop_path &&
          movie.overview &&
          movie.vote_average >= 6.5
      );

      if (heroCandidates.length > 0) {
        const randomMovie =
          heroCandidates[
            Math.floor(
              Math.random() *
                heroCandidates.length
            )
          ];

        setHeroMovie(randomMovie);
      }

    } catch (err) {
      setError(
        "Failed To Load Movies"
      );
    } finally {
      setLoading(false);
    }
  };

 if (loading) {
  return <Loader />;
}

  if (error) {
    return (
      <h1 className="error">
        {error}
      </h1>
    );
  }

  return (
    <div className="category-page">

      <HeroBanner movie={heroMovie} />

      <h2 className="section-title">
        🇯🇵 Japanese Movies
      </h2>

      <div className="movies-row">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      <h2 className="section-title">
        ⭐ Top Rated Movies
      </h2>

      <div className="movies-row">
        {topRatedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      <h2 className="section-title">
        🎌 Anime Movies
      </h2>

      <div className="movies-row">
        {animeMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      <h2 className="section-title">
        🚀 Action Movies
      </h2>

      <div className="movies-row">
        {actionMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      <h2 className="section-title">
        🎭 Drama Movies
      </h2>

      <div className="movies-row">
        {dramaMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

    </div>
  );
}

export default Japanese;