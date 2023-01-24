import axios from "axios";
const API_KEY = "0886ceab52e5519bb291973f7d5778c4";
const URL = "https://api.themoviedb.org/3";
const movieByIdURL = `${URL}/movie/`;

export const getMovieDetail = (movieId) => async (dispatch) => {
  const { data } = await axios.get(
    `${movieByIdURL}${movieId}?api_key=${API_KEY}`
  );
  dispatch({ type: "GET_DETAIL", payload: data });
};

export const getMovie = async (movieId) => {
  const { data } = await axios.get(
    `${movieByIdURL}${movieId}?api_key=${API_KEY}`
  );
  return {
    original_title: data.original_title,
    poster_path: data.poster_path,
    release_date: data.release_date,
    id: data.id,
  };
};
