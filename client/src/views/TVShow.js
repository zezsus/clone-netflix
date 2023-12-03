import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import "../assets/styles/styles-views/TVShow.scss";

const TVShow = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "tv" }));
    }
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      navigate("/");
    }
  });

  return (
    <div className="tv-show">
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length > 0 ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </div>
  );
};

export default TVShow;
