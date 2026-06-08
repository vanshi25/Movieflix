


import {
  createContext,
  useEffect,
  useState,
} from "react";

export const MovieContext = createContext();

function MovieProvider({ children }) {

  /* My List */

  const [favorites, setFavorites] = useState(() => {
    const saved =
      localStorage.getItem("favorites");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  /* Liked Movies */

  const [likedMovies, setLikedMovies] =
    useState(() => {
      const saved =
        localStorage.getItem("likedMovies");

      return saved
        ? JSON.parse(saved)
        : [];
    });

  /* Save Favorites */

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  /* Save Liked Movies */

  useEffect(() => {
    localStorage.setItem(
      "likedMovies",
      JSON.stringify(likedMovies)
    );
  }, [likedMovies]);

  /* Add To My List */

  const addToFavorites = (movie) => {

    const exists = favorites.find(
      (m) => m.id === movie.id
    );

    if (exists) {
      setFavorites(
        favorites.filter(
          (m) => m.id !== movie.id
        )
      );
    } else {
      setFavorites([
        ...favorites,
        movie,
      ]);
    }
  };

  /* Like Movie */

  const toggleLike = (movie) => {

    const exists = likedMovies.find(
      (m) => m.id === movie.id
    );

    if (exists) {
      setLikedMovies(
        likedMovies.filter(
          (m) => m.id !== movie.id
        )
      );
    } else {
      setLikedMovies([
        ...likedMovies,
        movie,
      ]);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addToFavorites,

        likedMovies,
        toggleLike,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider;