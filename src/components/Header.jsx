import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import logo from "../assets/tmdb.svg";
import avatar from "../assets/user-286.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebaseConfig";
import DropDownMenu from "./DropDownMenu";
import FilterMenu from "./FilterMenu";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    user &&
      dispatch({
        type: "SET_USER",
        payload: {
          uid: user.uid,
          displayName: user.displayName,
        },
      });
  }, [user, loading]);

  return (
    <Container>
      <img src={logo} onClick={() => navigate("/")} />
      <SearchBar />
      {user ? (
        <>
          {opened && <DropDownMenu setOpened={setOpened} />}
          <div
            style={{ cursor: "pointer" }}
            className="account"
            onClick={() => setOpened(!opened)}
          >
            <img
              style={{ width: "3rem", margin: "1rem 5px" }}
              src={avatar}
              alt="user avatar"
            />
            <p>{user.displayName}</p>
          </div>
        </>
      ) : (
        <Button onClick={() => navigate("/signin")}>Sign in</Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 35%;
    cursor: pointer;
    margin: 2rem 0;
  }
  .account {
    display: flex;
    align-items: center;
  }
  @media (max-width: 600px) {
    flex-direction: column;

    img {
      width: 70%;
      margin: 2rem 0;
    }
  }
`;

const Button = styled.button`
  border: 2px solid #46c2cb;
  border-radius: 10px;
  padding: 10px 1rem;
  background: #46c2cb;
  cursor: pointer;
`;

export default Header;
