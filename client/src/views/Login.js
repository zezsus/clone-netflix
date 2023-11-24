import React, { useState } from "react";
import "../assets/styles/Login.scss";
import BackgroundImages from "../components/BackgroundImages";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formValue;
  const navigate = useNavigate();

  const handleOnChangeLogin = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <BackgroundImages />
      <div className="content ">
        <Header register />
        <div className="body-login d-flex flex-column align-items-center justify-content-center">
          <div className="form">
            <div className="title d-flex flex-column">
              <h1>Login</h1>
            </div>
            <div className="container ">
              <input
                type="email"
                placeholder="Email address"
                name="email"
                value={email}
                onChange={handleOnChangeLogin}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handleOnChangeLogin}
                name="password"
                value={password}
              />
              <button className="btn-login" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
