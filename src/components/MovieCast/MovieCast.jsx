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
      } catch (error) {
        setError(true);
      } finally {
        setIsLoding(false);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  return (
    <ul>
      {isloding && <ClipLoader color="rgb(255, 163, 34)" />}
      {casts &&
        casts.map((cast) => (
          <li key={cast.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt={cast.name}
            />
            <p>{cast.name}</p>
            <p>Character: {cast.character}</p>
          </li>
        ))}
      {error && <p>Oops! Please, try again.</p>}
    </ul>
  );
}
