import { Outlet, useLocation, useParams } from "react-router-dom";
import { apiDetailsMovie } from "../../api";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [isLoding, setIsloding] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const refLocation = useRef(location.state ?? "/movies");
  console.log(refLocation);

  useEffect(() => {
    async function getDetailsMovie() {
      try {
        setIsloding(true);
        const data = await apiDetailsMovie(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsloding(false);
      }
    }
    getDetailsMovie();
  }, [movieId]);

  return (
    <>
      <div>
        <Link to={refLocation.current}>Go back</Link>
      </div>
      {isLoding && <ClipLoader color="rgb(255, 163, 34)" />}
      {movie && (
        <>
          <img
            src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
            alt={movie.title}
          ></img>
          <div>
            <p>{movie.title}</p>
            <p>User Score: {movie.vote_average}</p>
            <p>Owerview</p>
            <p>{movie.overview}</p>
            <p>Genres</p>
            <p>{movie.genres.map((item) => item.name).join(", ")}</p>
          </div>
          <div>
            <p>Additional Information</p>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
      {error && <p>Oops! Please try again later!</p>}
    </>
  );
}
