import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import { ToastContainer } from "react-toastify";
import Playser from "./views/Playser";
import Movies from "./views/Movies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/player" element={<Playser />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
