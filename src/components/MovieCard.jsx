import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkImage } from "../util";

const MovieCard = ({ movie }) => {
  const navigator = useNavigate();

  const imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const [isSafe, setIsSafe] = useState(false);

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

  return (
    <Container
      onClick={() => navigator(`/movie/${movie.id}`, { replace: true })}
    >
      {isSafe && <img src={imageURL} alt="" />}
      <div className="text">
        <h3>{movie.original_title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 10px;
  width: 280px;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 1rem;
    cursor: pointer;
  }

  h3,
  p {
    cursor: inherit;
  }

  .text {
    padding: 1rem 0;
  }

  &:hover {
    background-color: #46c2cb;
    border-radius: 1rem;
    box-shadow: 0 5px 10px 0 #46c2cb;
    transform: scale(1.2);

    z-index: 20;
  }
`;

export default MovieCard;
