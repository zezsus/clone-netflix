import React, { useState } from "react";
import "../assets/styles/Home.scss";
import Navbar from "../components/Navbar";
import backgroundImages from "../assets/images/home.jpg";
import movieLogo from "../assets/images/homeTitle.webp";
import icons from "../utils/icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const { FaPlay, AiOutlineInfoCircle } = icons;

  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  return (
    <div className="home">
      <Navbar isScrolled={isScrolled} />
      <div className="content-home">
        <img
          src={backgroundImages}
          alt="backgroundImage"
          className="background-image"
        />

        <div className="container-home">
          <div className="logo">
            <img src={movieLogo} alt="Movie Logo" />
          </div>

          <div className="buttons d-flex">
            <button
              className="btn-play d-flex justifu-content-center align-items-center"
              onClick={() => navigate("/player")}>
              <FaPlay />
              Play
            </button>
            <button className=" btn-more-info d-flex justifu-content-center align-items-center">
              <AiOutlineInfoCircle size={25} />
              More info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
