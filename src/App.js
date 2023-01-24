import styled from "styled-components";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import SignIn from "./components/Auth/pages/signin";
import SignUp from "./components/Auth/pages/signup";
import FavIcon from "react-favicon";

import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import { AnimatePresence } from "framer-motion";
import favIconImage from "./assets/favicon.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatchList from "./components/Watchlist";

function App() {
  const location = useLocation();
  const {
    popularMovies,
    searchResult,
    nowPlayingMovies,
    topRatedMovies,
    upcomingMovies,
    filteredMovies,
  } = useSelector((state) => state.movies);
  return (
    <Container>
      <FavIcon url={favIconImage} />
      <Header />
      <Nav />
      <ToastContainer />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <MovieList movies={popularMovies} title="Popular Movies" />
            }
          />
          <Route
            path="upcoming"
            element={
              <MovieList movies={upcomingMovies} title="Upcoming Movies" />
            }
          />
          <Route
            path="top_rated"
            element={
              <MovieList movies={topRatedMovies} title="Top Rated Movies" />
            }
          />
          <Route
            path="now_playing"
            element={
              <MovieList movies={nowPlayingMovies} title="Now Playing Movies" />
            }
          />
          <Route
            path="filter"
            element={
              <MovieList movies={filteredMovies} title="Filter Results" />
            }
          />
          <Route
            path="watchlist/:uid"
            element={<WatchList title="My Watchlist" />}
          />
          <Route
            path="search/:id"
            element={<MovieList movies={searchResult} title="Search Results" />}
          />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1600px;
  min-width: 350px;
  width: 90%;
  margin: 0 auto;

  color: #0d253f;
`;

export default App;
