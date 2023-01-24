import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { useDispatch } from "react-redux";
import { getFilteredMovies } from "../actions/movies";
import { useSelector } from "react-redux";

function FilterMenu() {
  const [genre, setGenre] = useState();
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [year, setYear] = useState(2023);

  const { filteredMovies } = useSelector((state) => state.movies);
  const navigate = useNavigate();
  const query = useQuery();

  const filterMovies = (e) => {
    e.preventDefault();
    if (filteredMovies) {
      filteredMovies.nextPage = 1;
      filteredMovies.list = [];
      navigate(`/filter?genre=${genre}&year=${year}&sort_by=${sortBy}`);
    }
  };

  useEffect(() => {
    const setQuery = () => {
      const g = query.get("genre");
      const s = query.get("sort_by");
      const y = query.get("year");
      if (g) setGenre(query.get("genre"));
      if (s) setSortBy(query.get("sort_by"));
      if (y) setYear(query.get("year"));
    };
    return () => {
      setQuery();
    };
  }, []);

  return (
    <Container>
      <form action="">
        <div>
          <p>Sort By</p>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            id="sort"
            name="sort"
            value={sortBy}
          >
            <option value="popularity.desc">Popularity</option>
            <option value="release_date.desc">Latest</option>
            <option value="original_title.asc">Title Asc</option>
            <option value="original_title.desc">Title Desc</option>
          </select>
        </div>
        <div>
          <p>Genre</p>
          <select
            onChange={(e) => setGenre(e.target.value)}
            id="genre"
            name="genre"
            value={genre}
          >
            <option value="undefined">All</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="10751">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Sci-Fi</option>
            <option value="10770">TV Movie</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
          </select>
        </div>
        <div>
          <p>Year</p>
          <input
            onChange={(e) => setYear(e.target.value)}
            type="number"
            name=""
            id=""
            value={year}
          />
          <Button onClick={filterMovies} type="submit">
            Filter
          </Button>
        </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
   {
    padding: 1rem 0;
    // background: #064663;
    // position: absolute;
    border-radius: 10px;
    z-index: 100;
    // top: 5rem;
    // left: 40%;
    width: 700px;

    form {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      select,
      input,
      option {
        color: white;
        padding: 5px;
        background: #064663;
        border: 2px solid #46c2cb;
        outline: none;
        border-radius: 5px;
      }
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          margin-right: 10px;
        }
      }
    }
  }
`;
const Button = styled.button`
  border: 2px solid #46c2cb;
  border-radius: 5px;
  padding: 6px 1rem;
  margin-left: 1rem;
  background: #46c2cb;
  cursor: pointer;
`;

export default FilterMenu;
