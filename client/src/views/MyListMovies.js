import "../assets/styles/styles-views/MyListMovies.scss";
import React, { useEffect, useState } from "react";
import "../assets/styles/styles-views/Movies.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLikedMovies } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const MyListMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  const movies = useSelector((state) => state.netflix.movies);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      navigate("/");
    }
  });

  return (
    <div className="my-list-movies">
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="content d-flex flex-column">
        <div className="grid">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                isLiked={true}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyListMovies;
