import "./HeroBanner.css";
import { Link } from "react-router-dom";

function HeroBanner({ movie }) {
  if (!movie) return null;

  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="hero-overlay">

        <div className="hero-content">

          <h1 className="hero-title">
            {movie.title || movie.name}
          </h1>

          <p className="hero-description">
            {movie.overview?.slice(0, 180)}...
          </p>

          <div className="hero-buttons">

            <Link to={`/movie/${movie.id}`}>
              <button className="play-btn">
                ▶ Play
              </button>
            </Link>

            <Link to={`/movie/${movie.id}`}>
              <button className="info-btn">
                ℹ More Info
              </button>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default HeroBanner;