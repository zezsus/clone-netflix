import React, { useState } from "react";
import "../assets/styles/styles-components/Card.scss";
import { useNavigate } from "react-router-dom";
import video from "../assets/images/video.mp4";
import icons from "../utils/icons";

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
  const navigate = useNavigate();

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
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>

            <div className="icons d-flex justify-content-between">
              <div className="controls d-flex">
                <FaPlayCircle
                  title="play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck title="Remove From List" />
                ) : (
                  <AiOutlinePlus title="Add to  my list" />
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