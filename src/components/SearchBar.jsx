import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const { searchResult } = useSelector((state) => state.movies);

  const onChangeHandler = (e) => {
    setSearchKey(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (searchKey) {
      searchResult.nextPage = 1;
      searchResult.list = [];
      navigate(`search/${searchKey}`);
    }
  };
  return (
    <Container onSubmit={onSubmitHandler}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search Movie"
        onChange={onChangeHandler}
        value={searchKey}
      />
      <button onClick={onSubmitHandler}>Search</button>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  width: 50%;
  font-size: 0.9rem;
  font-weight: 700;

  input {
    max-width: 400px;
    width: 100%;
    outline: 0;
    border: 0;
    height: 100%;
    color: white;
    background-color: var(--grey);
    border-radius: 5px 0px 0px 5px;
    font-size: inherit;
    font-weight: inherit;
    padding: 10px 10px;
  }
  button {
    border: 0;
    height: 100%;
    color: white;
    background-color: var(--soft-blue);
    font-size: inherit;
    font-weight: inherit;
    cursor: pointer;

    max-width: 100px;
    border-radius: 0px 5px 5px 0px;
    width: 100%;
  }

  @media (max-width: 600px) {
    width: 90%;
    margin-bottom: 2rem;
  }
`;

export default SearchBar;
