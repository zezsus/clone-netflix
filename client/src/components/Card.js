import React, { useState } from "react";
import "../assets/styles/styles-components/Card.scss";
import { useNavigate } from "react-router-dom";
import video from "../assets/images/video1.mp4";
import icons from "../utils/icons";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import axios from "axios";
import { addRouter } from "../utils/apiRouter";
import { useDispatch } from "react-redux";
import { deleteUserLikedMovies } from "../store";

const Card = ({ movieData, index, isLiked = false }) => {
  const {
    FaPlayCircle,
    RiThumbUpFill,
    RiThumbDownFill,
    BsCheck,
    AiOutlinePlus,
    BiChevronDown,
  } = icons;

  const [isHover, setIsHover] = useState(false);
  const [email, setEmail] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else {
      navigate("/login");
    }
  });

  const addToList = async () => {
    try {
      await axios.post(`${addRouter}`, { email, data: movieData });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteToList = () => {
    dispatch(
      deleteUserLikedMovies({
        email,
        movieId: movieData.id,
      })
    );
  };
  return (
    <div
      className="card"
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
      />
      {isHover && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
              onClick={() => navigate("/player")}
            />

            <video
              src={video}
              autoPlay
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>

          <div className="info-container d-flex flex-column">
            <h6 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h6>

            <div className="icons d-flex justify-content-between">
              <div className="controls d-flex">
                <FaPlayCircle
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck title="Remove From List" onClick={deleteToList} />
                ) : (
                  <AiOutlinePlus title="Add to  my list" onClick={addToList} />
                )}
              </div>

              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>

            <div className="genres d-flex">
              <ul className="d-flex">
                {movieData.genres.map((genre) => {
                  return <li key={genre}>{genre}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
