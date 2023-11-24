import React from "react";
import background from "../assets/images/login.jpg";
import "../assets/styles/BackgroundImage.scss";

const BackgroundImages = () => {
  return (
    <div className="background-image">
      <img src={background} alt="background" />
    </div>
  );
};

export default BackgroundImages;
