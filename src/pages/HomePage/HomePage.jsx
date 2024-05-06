import MovieList from "../../components/MovieList/MovieList";
import { apiTrendingMovies } from "../../api";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";

import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isloding, setLoding] = useState(false);

  useEffect(() => {
    async function getListMovies() {
      try {
        setLoding(true);
        const data = await apiTrendingMovies();
        setMovies(data.results);
        // console.log(movies);
      } catch (error) {
        setError(true);
      } finally {
        setLoding(false);
      }
    }
    getListMovies();
  }, []);
  return (
    <>
      <h1>Trending today</h1>
      {isloding && <ClipLoader color="rgb(255, 163, 34)" />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {error && <p className={css.error}>Oops! Please, try again</p>}
    </>
  );
}
