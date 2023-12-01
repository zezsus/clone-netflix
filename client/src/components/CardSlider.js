import React, { useRef, useState } from "react";
import Card from "./Card";
import "../assets/styles/styles-components/CardSlider.scss";
import icons from "../utils/icons";

const CardSlider = ({ data, title }) => {
  const { AiOutlineLeft, AiOutlineRight } = icons;

  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();

  const handleDirecion = (direction) => {
    console.log(direction);
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div
      className="card-slider d-flex flex-column"
      onMouseEnter={() => {
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setShowControls(false);
      }}>
      <h1>{title}</h1>

      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } d-flex justify-content-center align-items-center`}>
          <AiOutlineLeft onClick={() => handleDirecion("left")} />
        </div>

        <div className="card-slider-container d-flex" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>

        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } d-flex justify-content-center align-items-center`}>
          <AiOutlineRight onClick={() => handleDirecion("right")} />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
