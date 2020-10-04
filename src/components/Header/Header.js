import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import {
  handleGoogleSignIn,
  initializeLoginFramework,
} from "../Auth/LoginManager";
import "./Header.css";
import logo from "../../Images/logos/Group 1329.png";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  initializeLoginFramework();

  const handleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setLoggedInUser(res);
    });
  };

  const handleSlide = () => {
    document.querySelector(".nav-links").classList.toggle("nav-active");
    document.querySelectorAll(".nav-links li").forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
    document.querySelector(".nav-menu").classList.toggle("toggle");
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/home">
          <img src={logo} alt="" style={{ width: "120px" }} />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/donation"
            style={{ textDecoration: "none", color: "white" }}
          >
            Donation
          </Link>
        </li>
        <li>
          <Link to="/blog" style={{ textDecoration: "none", color: "white" }}>
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/userTasks"
            style={{ textDecoration: "none", color: "white" }}
          >
            Events
          </Link>
        </li>
        {!loggedInUser ? (
          <li className="d-flex">
            <button
              style={{
                textDecoration: "none",
                color: "white",
                background: "#03a9f4",
                outline: "none",
              }}
            >
              <Link to="register">Register</Link>
            </button>
            <br />
            <button
              style={{
                textDecoration: "none",
                color: "white",
                background: "#03a9f4",
                outline: "none",
              }}
            >
              <Link to="/admin">Admin</Link>
            </button>
          </li>
        ) : (
          <>
            <li style={{ color: "white" }}>{loggedInUser.name}</li>
            <li>
              <img
                style={{ width: "80px", borderRadius: "50%" }}
                src={loggedInUser.photo}
                alt=""
              />
            </li>
          </>
        )}
      </ul>
      <div className="nav-menu" onClick={handleSlide}>
        <div className="link1"></div>
        <div className="link2"></div>
        <div className="link3"></div>
      </div>
    </nav>
  );
};

export default Header;
