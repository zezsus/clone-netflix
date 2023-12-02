import React, { useRef } from "react";
import Card from "./Card";
import "../assets/styles/styles-components/CardSlider.scss";

const CardSlider = ({ data, title }) => {
  const listRef = useRef();

  return (
    <div className="card-slider">
      {data.length > 0 && (
        <div className="wrapper" ref={listRef}>
          <h2>{title}</h2>
          <div className="card-slider-container d-flex">
            {data.map((movie, index) => {
              return <Card movieData={movie} index={index} key={movie.id} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSlider;
