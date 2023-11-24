// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCexsrRha3BMPpU1bVU1xZiSYa54-iOD7E",
  authDomain: "react-netflix-clone-2e8f4.firebaseapp.com",
  projectId: "react-netflix-clone-2e8f4",
  storageBucket: "react-netflix-clone-2e8f4.appspot.com",
  messagingSenderId: "327654927592",
  appId: "1:327654927592:web:407334f34bdbd5caf52d5d",
  measurementId: "G-H7JMT2JW7B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
