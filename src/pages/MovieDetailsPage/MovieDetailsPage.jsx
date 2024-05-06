import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { apiDetailsMovie } from "../../api";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

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
      <div className={css.wrapperLinkGoBack}>
        <Link className={css.linkGoBack} to={refLocation.current}>
          <FaArrowLeftLong />
          Go back
        </Link>
      </div>
      {isLoding && <ClipLoader color="rgb(255, 163, 34)" />}
      {movie && (
        <>
          <div className={css.wrapperMovie}>
            <div className={css.wrapperImg}>
              <img
                className={css.img}
                src={"https://image.tmdb.org/t/p/w300" + movie.backdrop_path}
                alt={movie.title}
              ></img>
            </div>
            <div>
              <h1>{movie.title}</h1>
              <p>User Score: {movie.vote_average}</p>
              <h2>Owerview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <p>{movie.genres.map((item) => item.name).join(", ")}</p>
            </div>
          </div>
          <div className={css.wrapperAddInfo}>
            <h2>Additional Information</h2>
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    clsx(css.navLink, isActive && css.isActive)
                  }
                  to="cast"
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    clsx(css.navLink, isActive && css.isActive)
                  }
                  to="reviews"
                >
                  Reviews
                </NavLink>
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
