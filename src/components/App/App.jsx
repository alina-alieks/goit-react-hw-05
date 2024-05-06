import Layout from "../Layout/Layout";
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// import HomePage from "../../pages/HomePage/HomePage";
// import MoviesPage from "../../pages/MoviesPage/MoviesPage";
// import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";
// import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
// const MovieCast = lazy(() => import("../../pages/MovieCast/MovieCast"));
// const MovieReviews = lazy(() =>
//   import("../../pages/MovieReviews/MovieReviews")
// );
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

// import css from "./App.module.css";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />}></Route>
          <Route path="reviews" element={<MovieReviews />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
