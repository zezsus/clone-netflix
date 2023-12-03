import React, { useState } from "react";
import "../assets/styles/styles-components/Navbar.scss";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import icons from "../utils/icons";

const Navbar = ({ isScrolled }) => {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const { FaSearch, IoIosLogOut } = icons;

  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      navigate("/login");
    }
  });

  return (
    <div className="navbar-netflix">
      <nav className={`d-flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-left ">
          <div className="brand">
            <img
              src={logo}
              className="card-img-top"
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
            <ul className="links d-flex">
              {links.map((items) => {
                return (
                  <li key={items.name}>
                    <Link to={items.link}>{items.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="nav-right d-flex align-items-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              className="btn-search"
              onClick={() => setShowSearch(!showSearch)}>
              <FaSearch size={25} />
            </button>

            <input type="text" placeholder="Search" />
          </div>
          <button className="btn-logout" onClick={() => signOut(firebaseAuth)}>
            <IoIosLogOut size={25} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
