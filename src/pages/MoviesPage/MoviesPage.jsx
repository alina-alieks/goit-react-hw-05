import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { apiSearchsMovie } from "../../api";
import { useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  // const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [isloding, setLoding] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchParams = searchParams.get("query") ?? "";
  console.log(getSearchParams);

  // function handleChange(event) {
  //   event.target.value.trim();
  // searchParams.set("query", inputValue);
  // setSearchParams(searchParams);
  // return setQuery(inputValue);
  // }

  function handleSubmit(event) {
    event.preventDefault();

    const queryWords = event.target.elements.query.value.trim();
    if (queryWords === "") {
      return;
    }
    searchParams.set("query", queryWords);
    setSearchParams(searchParams);
    // return setQuery(queryWords);
  }
  useEffect(() => {
    async function getSearchMovies() {
      try {
        setLoding(true);
        const data = await apiSearchsMovie(getSearchParams);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoding(false);
      }
    }
    getSearchMovies();
  }, [getSearchParams]);

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          // onChange={handleChange}
          type="text"
          id="query"
          name="query"
          // value={getSearchParams}
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      {isloding && <ClipLoader color="rgb(255, 163, 34)" />}
      {movies.length > 0 && !isloding && <MovieList movies={movies} />}
      {error && <p className={css.error}>Oops! Please, try again</p>}
    </>
  );
}
