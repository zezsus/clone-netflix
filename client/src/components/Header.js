import React from "react";
import "../assets/styles/styles-components/Header.scss";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate(props.login ? "/login" : "/register");
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={handelClick}>{props.login ? "Login" : "Sign Up"}</button>
    </div>
  );
};

export default Header;
