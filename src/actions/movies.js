import axios from "axios";
const API_KEY = "0886ceab52e5519bb291973f7d5778c4";
const URL = "https://api.themoviedb.org/3";

const popularMovieURL = `${URL}/movie/popular?api_key=${API_KEY}`;
const latestMovieURL = `${URL}/movie/latest?api_key=${API_KEY}`;
const nowPlayingMovieURL = `${URL}/movie/now_playing?api_key=${API_KEY}`;
const topRatedMovieURL = `${URL}/movie/top_rated?api_key=${API_KEY}`;
const upcomingMovieURL = `${URL}/movie/upcoming?api_key=${API_KEY}`;
const searchMovieURL = `${URL}/search/movie?api_key=${API_KEY}&query=`;
const discoverMovieURL = `${URL}/discover/movie?api_key=${API_KEY}`;

export const getPopularMovies =
  (pageNumber, year, genres) => async (dispatch) => {
    const { data } = await axios.get(
      `${popularMovieURL}&page=${pageNumber}&primary_release_year=${year}&with_genres=${genres}`
    );
    dispatch({
      type: "FETCH_POPULAR",
      payload: data.results,
    });
  };
export const getLatestMovies = () => async (dispatch) => {
  const { data } = await axios.get(`${latestMovieURL}`);
  dispatch({ type: "FETCH_LATEST", payload: data });
};
export const getNowPlayingMovies = (pageNumber) => async (dispatch) => {
  const { data } = await axios.get(`${nowPlayingMovieURL}&page=${pageNumber}`);
  dispatch({
    type: "FETCH_NOW_PLAYING",
    payload: data.results,
  });
};
export const getTopRatedMovies = (pageNumber) => async (dispatch) => {
  const { data } = await axios.get(`${topRatedMovieURL}&page=${pageNumber}`);
  dispatch({
    type: "FETCH_TOP_RATED",
    payload: data.results,
  });
};
export const getUpcomingMovies = (pageNumber) => async (dispatch) => {
  const { data } = await axios.get(`${upcomingMovieURL}&page=${pageNumber}`);
  dispatch({
    type: "FETCH_UPCOMING",
    payload: data.results,
  });
};

export const getFilteredMovies =
  (pageNumber, year, genre, sort_by) => async (dispatch) => {
    const { data } = await axios.get(
      `${discoverMovieURL}&page=${pageNumber}&primary_release_year=${year}&with_genres=${genre}&sort_by=${sort_by}`
    );
    dispatch({
      type: "FETCH_FILTER",
      payload: data.results,
    });
  };

export const searchMovie = (searchKey, pageNumber) => async (dispatch) => {
  const { data } = await axios.get(
    `${searchMovieURL}${searchKey}&page=${pageNumber}`
  );
  dispatch({
    type: "FETCH_SEARCH",
    payload: data.results,
  });
};
