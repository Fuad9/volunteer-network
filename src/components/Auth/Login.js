import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../App";
import google from "../../Images/logos/google.png";
import { handleGoogleSignIn, initializeLoginFramework } from "./LoginManager";
import "./Login.css";
import logo from "../../Images/logos/Group 1329.png";

const Login = () => {
  const [setLoggedInUser] = useContext(AuthContext);
  const [setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });

  initializeLoginFramework();

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  return (
    <>
      <Link to="/home">
        <img style={{ width: "200px" }} src={logo} alt="" />
      </Link>
      <div className="auth">
        <button onClick={googleSignIn}>
          <img src={google} alt="" />
          Continue with Google
        </button>
      </div>
    </>
  );
};

export default Login;
