import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login_component.js";
import SignUp from "./components/signup_component.js";
import Dashboard from "../src/pages/Dashboard.js";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light sticky-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              Nutrition Tracker
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route exact path="/" element={isLoggedIn==="true" ? (<Dashboard/>) : (
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Login />
              </div>
            </div>
          )}  />
          <Route
            path="/sign-in"
            element={
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <Login />
                </div>
              </div>
            }
          />
          <Route
            path="/sign-up"
            element={
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <SignUp />
                </div>
              </div>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
