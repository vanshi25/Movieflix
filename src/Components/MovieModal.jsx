import { useEffect, useState, useContext } from "react";
import {
  FaPlay,
  FaPlus,
  FaThumbsUp,
  FaArrowLeft,
} from "react-icons/fa";

import { getMovieDetails } from "../Services/api";
import { MovieContext } from "../Context/MovieContext";

import "./MovieModal.css";

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const {
    favorites,
    addToFavorites,
    likedMovies,
    toggleLike,
  } = useContext(MovieContext);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(movie.id);
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
  }, [movie.id]);

  if (!details) {
    return (
      <div className="modal-overlay">
        <div className="movie-modal">
          <h2 style={{ padding: "30px" }}>
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.some(
    (fav) => fav.id === movie.id
  );

  const isLiked = likedMovies.some(
    (liked) => liked.id === movie.id
  );

  const genres =
    details.genres?.map((g) => g.name).join(", ") ||
    "N/A";

  const cast =
    details.credits?.cast
      ?.slice(0, 6)
      .map((actor) => actor.name)
      .join(", ") || "N/A";

  const trailer =
    details.videos?.results?.find(
      (video) => video.site === "YouTube"
    );

  return (
    <div className="modal-overlay">
      <div className="movie-modal">

        <div className="modal-banner-container">

          <button
            className="back-btn"
            onClick={() => {
              if (showTrailer) {
                setShowTrailer(false);
              } else {
                onClose();
              }
            }}
          >
            <FaArrowLeft />
          </button>

          {showTrailer && trailer ? (
            <>
              <iframe
                className="modal-banner"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <button
                className="replay-btn"
                onClick={() => {
                  setShowTrailer(false);

                  setTimeout(() => {
                    setShowTrailer(true);
                  }, 100);
                }}
              >
                🔄 Replay
              </button>
            </>
          ) : (
            <img
              className="modal-banner"
              src={
                details.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
                  : `https://image.tmdb.org/t/p/w500${details.poster_path}`
              }
              alt={details.title}
            />
          )}

          <div className="banner-gradient"></div>

          <div className="banner-content">

            <h1>{details.title}</h1>

            {!showTrailer && (
              <div className="banner-buttons">

                {trailer && (
                  <button
                    className="modal-play-btn"
                    onClick={() =>
                      setShowTrailer(true)
                    }
                  >
                    <FaPlay />
                    Watch Trailer
                  </button>
                )}

                <button
                  className={`modal-circle-btn ${
                    isFavorite
                      ? "favorite-active"
                      : ""
                  }`}
                  onClick={() =>
                    addToFavorites(movie)
                  }
                >
                  <FaPlus />
                </button>

                <button
                  className={`modal-circle-btn ${
                    isLiked
                      ? "liked-active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleLike(movie)
                  }
                >
                  <FaThumbsUp />
                </button>

              </div>
            )}

          </div>

        </div>

        <div className="movie-modal-content">

          <div className="modal-left-section">

            <div className="modal-movie-meta">
              <span className="rating">
                ⭐ {details.vote_average?.toFixed(1)}
              </span>

              <span>
                ⏱ {details.runtime} min
              </span>

              <span>
                📅 {details.release_date?.split("-")[0]}
              </span>
            </div>

            <p className="modal-overview">
              {details.overview}
            </p>

          </div>

          <div className="modal-right-section">

            <p>
              <strong>Genres</strong>
              <br />
              {genres}
            </p>

            <p>
              <strong>Cast</strong>
              <br />
              {cast}
            </p>

            <p>
              <strong>Language</strong>
              <br />
              {details.original_language?.toUpperCase()}
            </p>

            <p>
              <strong>Status</strong>
              <br />
              {details.status}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default MovieModal;