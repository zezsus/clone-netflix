import React, { useState } from "react";
import "../assets/styles/styles-views/Login.scss";
import BackgroundImages from "../components/BackgroundImages";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnterLogin = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      navigate("/");
    }
  });

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onKeyDown={handleEnterLogin}
              />
              <button
                className="btn-login"
                onClick={handleLogin}
                onKeyDown={handleEnterLogin}>
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
