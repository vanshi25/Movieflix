import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import HeroBanner from "../Components/HeroBanner";
import Loader from "../Components/Loader";
import {
  getKoreanMovies,
  getKoreanTopRatedMovies,
  getKoreanDramaMovies,
  getKoreanThrillerMovies,
} from "../Services/api";

import "./CategoryPage.css";

function Korean() {
  const [heroMovie, setHeroMovie] =
    useState(null);

  const [movies, setMovies] =
    useState([]);

  const [topRatedMovies,
    setTopRatedMovies] =
    useState([]);

  const [dramaMovies,
    setDramaMovies] =
    useState([]);

  const [thrillerMovies,
    setThrillerMovies] =
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

      const koreanData =
        await getKoreanMovies();

      const topRatedData =
        await getKoreanTopRatedMovies();

      const dramaData =
        await getKoreanDramaMovies();

      const thrillerData =
        await getKoreanThrillerMovies();

      setMovies(
        koreanData.results || []
      );

      setTopRatedMovies(
        topRatedData.results || []
      );

      setDramaMovies(
        dramaData.results || []
      );

      setThrillerMovies(
        thrillerData.results || []
      );

      const heroCandidates = [

        ...(topRatedData.results || [])
          .slice(0, 6),

        ...(dramaData.results || [])
          .slice(0, 4),

        ...(koreanData.results || [])
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
        🇰🇷 Korean Movies
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

      <h2 className="section-title">
        🔪 Thriller Movies
      </h2>

      <div className="movies-row">
        {thrillerMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

    </div>
  );
}

export default Korean;