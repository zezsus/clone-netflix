import React from "react";
import "../assets/styles/styles-views/Player.scss";
import icons from "../utils/icons";
import { useNavigate } from "react-router-dom";
import video from "../assets/images/video1.mp4";

const Playser = () => {
  const { IoIosArrowBack } = icons;

  const navigate = useNavigate();
  return (
    <div className="player">
      <div className="player">
        <div className="back">
          <IoIosArrowBack onClick={() => navigate(-1)} size={25} />
        </div>
        <video src={video} autoPlay loop controls muted></video>
      </div>
    </div>
  );
};

export default Playser;
