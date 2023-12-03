import React from "react";
import "../assets/styles/styles-components/SelectGenre.scss";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store";

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(
      fetchDataByGenre({
        genre: e.target.value,
        type,
      })
    );
  };

  return (
    <select className="select-genre" onChange={handleChange}>
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id} className="select-value">
            {genre.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectGenre;
