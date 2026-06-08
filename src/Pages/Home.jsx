

import Loader from "../Components/Loader";



import { useEffect, useState } from "react";
import "./CategoryPage.css";
import MovieCard from "../Components/MovieCard";
import HeroBanner from "../Components/HeroBanner";

import {
  getBollywoodMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getKoreanMovies,
  getJapaneseMovies,
} from "../Services/api";

function Home() {
  const [heroMovie, setHeroMovie] = useState(null);

  const [indianMovies, setIndianMovies] = useState([]);
  const [hollywood, setHollywood] = useState([]);
  const [korean, setKorean] = useState([]);
  const [japanese, setJapanese] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const indianData = await getBollywoodMovies();
      const hollywoodData = await getTrendingMovies();
      const koreanData = await getKoreanMovies();
      const japaneseData = await getJapaneseMovies();
      const topRatedData = await getTopRatedMovies();

      setIndianMovies(indianData.results || []);
      setHollywood(hollywoodData.results || []);
      setKorean(koreanData.results || []);
      setJapanese(japaneseData.results || []);
      setTopRated(topRatedData.results || []);

      const heroCandidates = [
        ...(hollywoodData.results || []).slice(0, 6),
        ...(topRatedData.results || []).slice(0, 3),
        ...(indianData.results || []).slice(0, 4),
      ].filter(
        (movie) =>
          movie &&
          movie.backdrop_path &&
          movie.overview &&
          movie.vote_average >= 6
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 if (loading) {
  return <Loader />;
}

  return (
    <div className="home">

      <HeroBanner movie={heroMovie} />

      <h2 className="section-title">
        🇮🇳 Trending In India
      </h2>

      <div className="movies-row">
        {indianMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      <h2 className="section-title">
        🔥 Trending Worldwide
      </h2>

      <div className="movies-row">
        {hollywood.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      <h2 className="section-title">
        🇰🇷 Korean Movies
      </h2>

      <div className="movies-row">
        {korean.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

      <h2 className="section-title">
        🇯🇵 Japanese Movies
      </h2>

      <div className="movies-row">
        {japanese.map((movie) => (
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
        {topRated.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>

    </div>
  );
}

export default Home;