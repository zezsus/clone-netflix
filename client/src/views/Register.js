import React, { useState } from "react";
import "../assets/styles/Register.scss";
import BackgroundImages from "../components/BackgroundImages";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formValue;
  const navigate = useNavigate();

  const handleOnChangeRegister = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(formValue);
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      navigate("/");
    }
  });

  return (
    <div className="register">
      <BackgroundImages />
      <div className="content ">
        <Header login />
        <div className="body-register d-flex flex-column align-items-center justify-content-center">
          <div className="text d-flex flex-column">
            <h1>Unlimikted movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={email}
              onChange={handleOnChangeRegister}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={handleOnChangeRegister}
                name="password"
                value={password}
              />
            )}
            {!showPassword && (
              <button
                className="btn-started"
                onClick={() => setShowPassword(true)}>
                Get Started
              </button>
            )}
          </div>
          {showPassword && (
            <button className="btn-login" onClick={handleRegister}>
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
