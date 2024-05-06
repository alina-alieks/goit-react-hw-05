import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { apiSearchsMovie } from "../../api";
import { useLocation, useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchParams = searchParams.get("query") ?? "";

  function handleChange(event) {
    const inputValue = event.target.value.trim();
    searchParams.set("query", inputValue);
    setSearchParams(searchParams);
    // console.log(searchParams);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const queryWords = event.target.elements.query.value.trim();
    if (queryWords === "") {
      return;
    }

    return setQuery(queryWords);
  }
  useEffect(() => {
    async function getSearchMovies() {
      try {
        const data = await apiSearchsMovie(query);
        setMovies(data.results);
      } catch (error) {
        console.log("Error");
      }
    }
    getSearchMovies();
  }, [query]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        id="query"
        name="query"
        value={getSearchParams}
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      ></input>
      <button type="submit">Search</button>
      <MovieList movies={movies} />
    </form>
  );
}
