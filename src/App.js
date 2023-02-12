import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";
import Forum from "./pages/Forum";
import About from "./pages/About";
import { getUser, removeUser, getEmail } from "./data/repository";


function App() {
  const [username, setUsername] = useState(getUser());
  const [email, setEmail] = useState(getEmail());

  const loginUser = (username, email) => { //after logging, values stored in loginUser
    setUsername(username);
    setEmail(email);
  }

  const logoutUser = () => {
    removeUser();
    setUsername(null);
  }



  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar user={{username}} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home user={{username}} />} />
              <Route path="/login" element={<Login loginUser={loginUser} />} />
              <Route path="/profile" element={<MyProfile username={username} email={email} />} /> 
              <Route path="/forum" element={<Forum user={{username}} />} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/about" element={<About user={username} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
