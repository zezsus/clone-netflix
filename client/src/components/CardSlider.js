import React, { useRef, useState } from "react";
import Card from "./Card";
import "../assets/styles/styles-components/CardSlider.scss";

const CardSlider = ({ data, title }) => {
  // const [sliderPosition, setSliderPosition] = useState(0);
  // const listRef = useRef();

  return (
    <>
      {data.length > 0 && (
        <div className="card-slider d-flex flex-column">
          <h2>{title}</h2>

          <div className="wrapper">
            <div className="card-slider-container d-flex">
              {data.map((movie, index) => {
                return <Card movieData={movie} index={index} key={movie.id} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardSlider;
