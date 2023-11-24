import React, { useState } from "react";
import "../assets/styles/Home.scss";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.onscroll = null;
    };
  };

  return (
    <div>
      <Navbar isScrolled={isScrolled} />
    </div>
  );
};

export default Home;
