import { useContext } from "react";
import { MovieContext } from "../Context/MovieContext";
import MovieCard from "../Components/MovieCard";

function Favorites() {

  const {
    favorites,
    likedMovies,
  } = useContext(MovieContext);

  return (
    <div className="home">

      {/* My List */}

      <h2 className="section-title">
        ❤️ My List
      </h2>

      {favorites.length === 0 ? (
        <h3
          style={{
            color: "white",
            padding: "20px 50px",
          }}
        >
          No movies in your list
        </h3>
      ) : (
        <div className="movies-row">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}

      {/* Liked Movies */}

      <h2 className="section-title">
        👍 Liked Movies
      </h2>

      {likedMovies.length === 0 ? (
        <h3
          style={{
            color: "white",
            padding: "20px 50px",
          }}
        >
          No liked movies
        </h3>
      ) : (
        <div className="movies-row">
          {likedMovies.map((movie) => (
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

export default Favorites;