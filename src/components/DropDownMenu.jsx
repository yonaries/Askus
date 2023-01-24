import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logOut from "./Auth/functions/sign-out";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../config/firebaseConfig";

function DropDownMenu({ setOpened }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  return (
    <Menu>
      <ul>
        <li
          onClick={() => {
            setOpened(false);
            navigate(`watchlist/${user.uid}`, { replace: true });
          }}
        >
          Watchlist
        </li>
        <li
          onClick={() => {
            setOpened(false);
            logOut();
            if (location.pathname === "watchlist") navigate("popular");
          }}
        >
          Logout
        </li>
      </ul>
    </Menu>
  );
}

export default DropDownMenu;

const Menu = styled.div`
   {
    width: fit-content;
    background: white;
    border-radius: 5px;
    padding: 5px;
    display: block;
    position: absolute;
    top: 5rem;
    right: 4rem;
    z-index: 100;

    ul {
      list-style: none;
    }

    li {
      padding: 5px 15px;
      color: black;
      cursor: pointer;
    }
    li:hover {
      color: white;
      background: #46c2cb;
      border-radius: 5px;
    }
  }
`;
