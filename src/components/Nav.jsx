import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FilterMenu from "./FilterMenu";

const Nav = () => {
  const navigate = useNavigate();

  const ClickHandler = (e) => {
    const navItems = document.querySelectorAll(".slider-item");
    navItems.forEach((item) => {
      if (item == e.target) item.classList.add("selected");
      else item.classList.remove("selected");
    });

    switch (e.target.textContent) {
      case "popular":
        navigate("/");
        break;
      case "upcoming":
        navigate("upcoming");
        break;
      case "top rated":
        navigate("top_rated");
        break;
      case "now playing":
        navigate("now_playing");
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <NavContainer>
        <NavItem className="slider-item selected" onClick={ClickHandler}>
          popular
        </NavItem>
        <NavItem className="slider-item" onClick={ClickHandler}>
          upcoming
        </NavItem>
        <NavItem className="slider-item" onClick={ClickHandler}>
          top rated
        </NavItem>
        <NavItem className="slider-item" onClick={ClickHandler}>
          now playing
        </NavItem>
      </NavContainer>
      <FilterMenu />
    </div>
  );
};

const NavContainer = styled(motion.div)`
  display: flex;
  height: fit-content;
  position: relative;
  background-color: #0d253f;
  .selected {
    color: #0d253f;
    background-color: #90cea1;
  }
`;

const NavItem = styled(motion.div)`
  cursor: pointer;
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background-color: transparent;
  color: #fff;
  text-transform: capitalize;

  transition: background-color, color, font-size 0.25s ease-in-out;

  @media (max-width: 410px) {
    font-size: 0.9rem;
  }
`;

export default Nav;
