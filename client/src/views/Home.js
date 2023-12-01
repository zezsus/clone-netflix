import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/styles-views/Home.scss";
import Navbar from "../components/Navbar";
import backgroundImages from "../assets/images/home.jpg";
import movieLogo from "../assets/images/homeTitle.webp";
import icons from "../utils/icons";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";

const Home = () => {
  const { FaPlay, AiOutlineInfoCircle } = icons;

  const [isScrolled, setIsScrolled] = useState(false);

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded]);

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
      <Slider movies={movies} />
    </div>
  );
};

export default Home;
