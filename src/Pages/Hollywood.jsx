import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import HeroBanner from "../Components/HeroBanner";
import Loader from "../Components/Loader";
import {
  getTrendingMovies,
  getHollywoodActionMovies,
  getHollywoodRomanceMovies,
  getHollywoodHorrorMovies,
  getHollywoodComedyMovies,
} from "../Services/api";

import "./CategoryPage.css";

function Hollywood() {
  const [heroMovie, setHeroMovie] = useState(null);

  const [movies, setMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const trendingData =
        await getTrendingMovies();

      const actionData =
        await getHollywoodActionMovies();

      const romanceData =
        await getHollywoodRomanceMovies();

      const horrorData =
        await getHollywoodHorrorMovies();

      const comedyData =
        await getHollywoodComedyMovies();

      setMovies(
        trendingData.results || []
      );

      setActionMovies(
        actionData.results || []
      );

      setRomanceMovies(
        romanceData.results || []
      );

      setHorrorMovies(
        horrorData.results || []
      );

      setComedyMovies(
        comedyData.results || []
      );

      const heroCandidates =
        (trendingData.results || [])
          .filter(
            (movie) =>
              movie.backdrop_path &&
              movie.overview &&
              movie.vote_average >= 6
          )
          .slice(0, 8);

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
        🎬 Hollywood Movies
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
        👻 Horror Movies
      </h2>

      <div className="movies-row">
        {horrorMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      <h2 className="section-title">
        😂 Comedy Movies
      </h2>

      <div className="movies-row">
        {comedyMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

    </div>
  );
}

export default Hollywood;