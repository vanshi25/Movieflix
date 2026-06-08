import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../Services/api";
import "./MovieDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../Components/Loader";
function MovieDetails() {


  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);

      const data = await getMovieDetails(id);

      setMovie(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
if (loading) {
  return <Loader />;
}

  if (!movie) {
    return (
      <h1 className="loader">
        Movie Not Found
      </h1>
    );
  }

  const trailer = movie.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  return (
    <>
    <div
    className="back-btn"
    onClick={()=>navigate(-1)}
    >
      <FaArrowLeft />
    </div>
    <div className="movie-details">

      {trailer && (
        <div className="trailer-box">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
          />
        </div>
      )}

      <div className="movie-content">

        <h1 className="movie-title">
          {movie.title || movie.name}
        </h1>

        <div className="movie-meta">
          <span>
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>

          <span>
            📅 {movie.release_date}
          </span>

          <span>
            ⏱ {movie.runtime} min
          </span>
        </div>

        <p className="movie-overview">
          {movie.overview}
        </p>

        <h2 className="cast-title">
          Top Cast
        </h2>

        <div className="cast-container">

          {movie.credits?.cast
            ?.slice(0, 12)
            .map((actor) => (

              <div
                key={actor.id}
                className="cast-card"
              >

                <img
                  className="cast-image"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : "https://placehold.co/300x450/222/fff?text=No+Image"
                  }
                  alt={actor.name}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/300x450/222/fff?text=No+Image";
                  }}
                />

                <h4>
                  {actor.name}
                </h4>

                <p>
                  {actor.character}
                </p>

              </div>

            ))}

        </div>

      </div>



    </div>
    </>
  );
}

export default MovieDetails;