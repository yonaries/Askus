import { collection, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { getMovie } from "../actions/movieDetail";
import { auth, database } from "../config/firebaseConfig";
import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";

const WatchList = ({ title }) => {
  const [currentMovieList, setCurrentMovieList] = useState([]);
  const containerEl = useRef(null);
  const [user] = useAuthState(auth);
  const params = useParams();

  const watchlistRef = collection(
    database,
    "watchlist",
    user ? params.uid : "",
    "list"
  );
  const movieQuery = user && query(watchlistRef);
  const [values, loading, error, snapshot] = useCollectionData(movieQuery);

  useEffect(() => {
    let fetchIsDone = false;
    const fetch = async () => {
      if (!fetchIsDone && !loading) {
        values.length > 0 &&
          values.map(async (movie) => {
            const data = await getMovie(movie.movie_id);
            setCurrentMovieList((list) => [...list, data]);
          });
      }
    };
    fetch();
    return () => {
      fetchIsDone = true;
    };
  }, [values]);

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
          {currentMovieList.map((movie, index) => (
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

export default WatchList;
