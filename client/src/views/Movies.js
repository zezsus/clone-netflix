import React, { useEffect, useState } from "react";
import "../assets/styles/styles-views/Movies.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";

const Movies = () => {
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
      dispatch(fetchMovies({ type: "movie" }));
    }
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      // navigate("/");
    }
  });

  return (
    <div className="movies">
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="data">
        {movies.length > 0 ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </div>
  );
};

export default Movies;
