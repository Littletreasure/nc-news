import React from "react";
import "../styles/header.css";
import { Link } from "@reach/router";
import LoginForm from "./loginForm";
import LogOutForm from "./logOutForm";
import logo from "../Northcoders.png";

function Header(props) {
  const { loggedInUser, loggedIn, loginError, loginUser, logOutUser } = props;
  return (
    <header className="header">
      <div className="logohome">
        <img src={logo} alt="logo"></img>
        <Link to="/">
          <button className="home">Home</button>
        </Link>
      </div>
      <h1>NC-News</h1>
      <div>
        <p className="date">{new Date().toDateString()}</p>
        {loginError ? <p className="error">User not found</p> : null}
        {!loggedIn ? (
          <LoginForm loginUser={loginUser} loginError={loginError} />
        ) : (
          <LogOutForm loggedInUser={loggedInUser} logOutUser={logOutUser} />
        )}
      </div>
    </header>
  );
}

export default Header;
