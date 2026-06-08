import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import HeroBanner from "../Components/HeroBanner";
import Loader from "../Components/Loader";
import {
  getBollywoodMovies,
  getBollywoodTopRatedMovies,
  getBollywoodActionMovies,
  getBollywoodRomanceMovies,
  getBollywoodComedyMovies,
} from "../Services/api";

import "./CategoryPage.css";

function Bollywood() {
  const [heroMovie, setHeroMovie] =
    useState(null);

  const [movies, setMovies] =
    useState([]);

  const [topRatedMovies,
    setTopRatedMovies] =
    useState([]);

  const [actionMovies,
    setActionMovies] =
    useState([]);

  const [romanceMovies,
    setRomanceMovies] =
    useState([]);

  const [comedyMovies,
    setComedyMovies] =
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

      const bollywoodData =
        await getBollywoodMovies();

      const topRatedData =
        await getBollywoodTopRatedMovies();

      const actionData =
        await getBollywoodActionMovies();

      const romanceData =
        await getBollywoodRomanceMovies();

      const comedyData =
        await getBollywoodComedyMovies();

      setMovies(
        bollywoodData.results || []
      );

      setTopRatedMovies(
        topRatedData.results || []
      );

      setActionMovies(
        actionData.results || []
      );

      setRomanceMovies(
        romanceData.results || []
      );

      setComedyMovies(
        comedyData.results || []
      );

      const bannedMovies = [
        "Dhurandhar",
        "Tu Yaa Main",
        "Saiyaara",
        "Animal",
        "Border 2",
        "Dhurandhar: The Revenge"
      ];

      const heroCandidates =
        (bollywoodData.results || [])
          .filter(
            (movie) =>
              movie.backdrop_path &&
              movie.overview &&
              movie.vote_average >= 6 &&
              !bannedMovies.includes(
                movie.title
              )
          )
          .slice(0, 12);

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

      <HeroBanner
        movie={heroMovie}
      />

      <h2 className="section-title">
        🇮🇳 Bollywood Movies
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
        {topRatedMovies.map(
          (movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          )
        )}
      </div>

      <h2 className="section-title">
        ❤️ Romance Movies
      </h2>

      <div className="movies-row">
        {romanceMovies.map(
          (movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          )
        )}
      </div>

      <h2 className="section-title">
        🚀 Action Movies
      </h2>

      <div className="movies-row">
        {actionMovies.map(
          (movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          )
        )}
      </div>

      <h2 className="section-title">
        😂 Comedy Movies
      </h2>

      <div className="movies-row">
        {comedyMovies.map(
          (movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          )
        )}
      </div>

    </div>
  );
}

export default Bollywood;