import "./SearchResults.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import {
  searchMulti,
  getMoviesByYear,
  searchPerson,
  getPersonMovies,
  discoverMoviesByGenres,
} from "../Services/api";

import MovieCard from "../Components/MovieCard";

function SearchResults() {
  const { query } = useParams();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    try {
      setLoading(true);

      const q = query.toLowerCase();

      // AI SEARCH

      if (
        q.includes("sad") ||
        q.includes("romantic")
      ) {
        const data =
          await discoverMoviesByGenres(
            "18,10749"
          );

        setResults(data.results || []);
        return;
      }

      if (
        q.includes("funny") ||
        q.includes("comedy")
      ) {
        const data =
          await discoverMoviesByGenres("35");

        setResults(data.results || []);
        return;
      }

      if (
        q.includes("horror") ||
        q.includes("scary")
      ) {
        const data =
          await discoverMoviesByGenres("27");

        setResults(data.results || []);
        return;
      }

      if (q.includes("thriller")) {
        const data =
          await discoverMoviesByGenres("53");

        setResults(data.results || []);
        return;
      }

      if (q.includes("action")) {
        const data =
          await discoverMoviesByGenres("28");

        setResults(data.results || []);
        return;
      }

      if (q.includes("anime")) {
        const data =
          await discoverMoviesByGenres(
            "16",
            "ja"
          );

        setResults(data.results || []);
        return;
      }

      if (q.includes("korean")) {
        const data =
          await discoverMoviesByGenres(
            "",
            "ko"
          );

        setResults(data.results || []);
        return;
      }

      if (q.includes("family")) {
        const data =
          await discoverMoviesByGenres(
            "10751"
          );

        setResults(data.results || []);
        return;
      }

      if (q.includes("crime")) {
        const data =
          await discoverMoviesByGenres("80");

        setResults(data.results || []);
        return;
      }

      if (q.includes("war")) {
        const data =
          await discoverMoviesByGenres(
            "10752"
          );

        setResults(data.results || []);
        return;
      }

      if (q.includes("superhero")) {
        const data =
          await discoverMoviesByGenres(
            "28,878"
          );

        setResults(data.results || []);
        return;
      }

      if (q.includes("zombie")) {
        const data =
          await discoverMoviesByGenres(
            "27,53"
          );

        setResults(data.results || []);
        return;
      }

      // YEAR SEARCH

      if (/^\d{4}$/.test(query)) {
        const data =
          await getMoviesByYear(query);

        setResults(data.results || []);
        return;
      }

      // ACTOR SEARCH

      const personData =
        await searchPerson(query);

      if (
        personData.results &&
        personData.results.length > 0
      ) {
        const person =
          personData.results[0];

        const credits =
          await getPersonMovies(
            person.id
          );

        if (
          credits.cast &&
          credits.cast.length > 0
        ) {
          setResults(
            credits.cast.sort(
              (a, b) =>
                b.popularity -
                a.popularity
            )
          );

          return;
        }
      }

      // MOVIE SEARCH

      const data =
        await searchMulti(query);

      const filteredResults =
        (data.results || []).filter(
          (item) =>
            item.media_type ===
              "movie" ||
            item.media_type === "tv"
        );

      setResults(filteredResults);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="loader">
        Searching...
      </h1>
    );
  }

  return (
    <div className="home">

      <h2 className="section-title">
        Results for "{query}"
      </h2>

      {results.length === 0 ? (
        <h2
          style={{
            color: "white",
            padding: "20px 50px",
          }}
        >
          No Results Found
        </h2>
      ) : (
        <div className="movies-grid">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default SearchResults;