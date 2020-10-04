import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../App";
import google from "../../Images/logos/google.png";
import { handleGoogleSignIn, initializeLoginFramework } from "./LoginManager";
import "./Login.css";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  const [user, setUser] = useState({
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
