import axios from "axios";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzgyZjk4M2Y0MzcwMmFmOGFhMWYyMzhjZDNlODM1NSIsInN1YiI6IjY2MzYxZWU4ZTkyZDgzMDEyYWQzMmNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w87hhhQhIkBLz0OIIo5L7ccSR82CEQwD0Utus7YiOC8",
    accept: "application / json",
  },
};

export async function apiTrendingMovies() {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const response = await axios.get(url, options);
  //   console.log(response.data);
  return response.data;
}

export async function apiDetailsMovie(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const response = await axios.get(url, options);
  //   console.log(response.data);
  return response.data;
}

export async function apiSearchsMovie(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const response = await axios.get(url, options);
  //   console.log(response.data);
  return response.data;
}

export async function apiCast(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const response = await axios.get(url, options);
  //   console.log(response.data);
  return response.data;
}

export async function apiReviews(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
  const response = await axios.get(url, options);
  console.log(response.data);
  return response.data;
}
