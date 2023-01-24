import { combineReducers } from "redux";
import movies from "./movies";
import movieDetail from "./movieDetail";
import { userAction } from "./user";

export default combineReducers({
  movies,
  movieDetail,
  userAction,
});
