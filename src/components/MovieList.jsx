import styled from "styled-components";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovie,
  getFilteredMovies,
} from "../actions/movies";
import { useLocation } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";

const MovieList = ({ movies, title }) => {
  const [currentMovieList, setCurrentMovieList] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const containerEl = useRef(null);
  const query = useQuery();

  useEffect(() => {
    if (movies.nextPage === 1) {
      fetchMovies(location.pathname);
    }
  }, [location]);

  window.onscroll = function () {
    if (containerEl.current !== null) {
      if (
        window.innerHeight + window.scrollY ===
        containerEl.current.offsetHeight + containerEl.current.offsetTop
      ) {
        fetchMovies(location.pathname);
      }
    }
  };

  function fetchMovies(tab) {
    switch (tab) {
      case "/":
        dispatch(getPopularMovies(movies.nextPage));
        break;
      case "/upcoming":
        dispatch(getUpcomingMovies(movies.nextPage));
        break;
      case "/top_rated":
        dispatch(getTopRatedMovies(movies.nextPage));
        break;
      case "/now_playing":
        dispatch(getNowPlayingMovies(movies.nextPage));
        break;
      case "/filter":
        dispatch(
          getFilteredMovies(
            movies.nextPage,
            query.get("year"),
            query.get("genre"),
            query.get("sort_by")
          )
        );
        break;
      default:
        break;
    }

    if (`/${tab.split("/")[1]}` === "/search") {
      const searchKey = tab.split("/")[2];
      dispatch(searchMovie(searchKey, movies.nextPage));
    }
  }

  return (
    <Container
      ref={containerEl}
      initial={{ y: window.innerHeight }}
      animate={{ y: "0%" }}
      exit={{
        y: -1 * window.innerHeight,
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
      transition={{
        type: "spring",
        duration: 1,
      }}
    >
      <h1>{title}</h1>
      {currentMovieList && (
        <MovieContainer>
          {movies.list.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
          ))}
        </MovieContainer>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  padding-bottom: 3rem;
  h1 {
    margin: 2rem 0;
    color: #46c2cb;
  }
`;

const MovieContainer = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default MovieList;
