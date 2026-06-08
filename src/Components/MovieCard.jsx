import { useState, useContext } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaPlay, FaPlus, FaThumbsUp } from "react-icons/fa";

import MovieModal from "./MovieModal";
import { MovieContext } from "../Context/MovieContext";

import "./MovieCard.css";

function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);

  const {
    favorites,
    addToFavorites,
    likedMovies,
    toggleLike,
  } = useContext(MovieContext);

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const isFavorite = favorites.some(
    (fav) => fav.id === movie.id
  );

  const isLiked = likedMovies.some(
    (liked) => liked.id === movie.id
  );

  return (
    <>
      <div className="movie-card">

        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className="movie-poster"
        />

        <div className="movie-name-overlay">
          {movie.title || movie.name}
        </div>

        <div className="movie-hover-card">

          <div className="hover-content">

            <div className="overlay-buttons">

              {/* Play */}

              <button
                className="icon-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(true);
                }}
              >
                <FaPlay />
                <span className="tooltip">
                  Play
                </span>
              </button>

              {/* My List */}

              <button
                className={`icon-btn ${
                  isFavorite
                    ? "favorite-active"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  addToFavorites(movie);
                }}
              >
                <FaPlus />

                <span className="tooltip">
                  {isFavorite
                    ? "Remove From My List"
                    : "Add To My List"}
                </span>
              </button>

              {/* Like */}

              <button
                className={`icon-btn ${
                  isLiked
                    ? "liked-active"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  toggleLike(movie);
                }}
              >
                <FaThumbsUp />

                <span className="tooltip">
                  {isLiked
                    ? "Liked"
                    : "I Like This"}
                </span>
              </button>

              {/* More Info */}

              <button
                className="icon-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setShowModal(true);
                }}
              >
                <IoChevronDown />

                <span className="tooltip">
                  More Info
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {showModal && (
        <MovieModal
          movie={movie}
          onClose={() =>
            setShowModal(false)
          }
        />
      )}
    </>
  );
}

export default MovieCard;