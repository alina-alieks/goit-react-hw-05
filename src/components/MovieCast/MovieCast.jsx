import { useParams } from "react-router-dom";
import { apiCast } from "../../api";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState(null);
  const [error, setError] = useState(false);
  const [isloding, setIsLoding] = useState(false);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        setIsLoding(true);
        const data = await apiCast(movieId);
        setCasts(data.cast);
        console.log(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoding(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <ul className={css.wrapperCast}>
      {isloding && <ClipLoader color="rgb(255, 163, 34)" />}
      {casts &&
        casts.map((cast) => (
          <li className={css.item} key={cast.id}>
            <img
              className={css.img}
              src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
              alt={cast.name}
            />
            <h3>{cast.name}</h3>
            <p>Character: {cast.character}</p>
          </li>
        ))}
      {error && <p className={css.error}>Oops! Please, try again.</p>}
    </ul>
  );
}
