import {
  addDoc,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail } from "../actions/movieDetail";
import { auth, database } from "../config/firebaseConfig";
import { checkImage } from "../util";
import Comments from "./comments";

const MovieDetail = () => {
  const [isSafe, setIsSafe] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetail(params.id));
  }, [params.id, dispatch]);

  const [user] = useAuthState(auth);
  const movie = useSelector((state) => state.movieDetail);
  const imageURL = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;

  const watchlistRef =
    user && collection(database, "watchlist", user.uid, "list");
  const movieQuery =
    user && query(watchlistRef, where("movie_id", "==", params.id));
  const [values, loading, error, snapshot] = useCollectionData(movieQuery);

  useEffect(() => {
    checkImage(
      imageURL,
      function () {
        setIsSafe(true);
      },
      function () {
        setIsSafe(false);
      }
    );
  }, []);

  const addToWatchList = async () => {
    try {
      await addDoc(watchlistRef, { movie_id: params.id });
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromWatchList = async () => {
    try {
      snapshot.forEach(function (doc) {
        deleteDoc(doc.ref);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      initial={{ scale: "0%" }}
      animate={{ scale: "100%" }}
      transition={{
        type: "spring",
        duration: 1.5,
        bounce: 0.25,
      }}
    >
      {isSafe && <img src={imageURL} alt={movie.original_title} />}
      <div className="card">
        <div>
          <h1>{movie.original_title}</h1>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-description-item">
            <strong>Release date:</strong>
            <p>{movie.release_date}</p>
          </div>
          <div className="movie-description-item">
            <strong>Rating:</strong>
            <p>{movie.popularity}</p>
          </div>
        </div>
        {user &&
          (loading ? (
            <div></div>
          ) : values.length > 0 ? (
            <div className="watchlist">
              <Button onClick={() => removeFromWatchList()}>Remove</Button>
            </div>
          ) : (
            <div className="watchlist">
              <Button onClick={() => addToWatchList()}>Save</Button>
            </div>
          ))}
      </div>
      <Comments movieId={params.id} />
    </Container>
  );
};

const Container = styled(motion.div)`
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
    margin: 3rem 0;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .card {
    display: flex;
    justify-content: space-between;
    align-items: start;
    background: transparent;
    width: 100%;
    .watchlist {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: fit-content;
      cursor: pointer;
    }
    .movie-overview {
      margin-bottom: 2rem;
      width: 80%;
    }

    .movie-description-item {
      display: flex;
      margin-bottom: 0.5rem;

      strong {
        margin-right: 1rem;
      }
    }
  }
`;
const Button = styled.button`
  border: none;
  border-radius: 5px;
  font-size: 17px;
  padding: 6px 1rem;
  margin-left: 1rem;
  background-color: var(--soft-blue);
  cursor: pointer;
`;

export default MovieDetail;
