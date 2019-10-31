import React, { Component } from "react";
import "../styles/header.css";
import { Link } from "@reach/router";
import LoginForm from "./loginForm";
import LogOutForm from "./logOutForm";

class Header extends Component {
  state = {
    loggedInUser: null,
    loginError: null
  };

  componentDidMount() {
    this.setState({
      loggedInUser: this.props.loggedInUser,
      loginError: this.props.loginError
    });
  }

  render() {
    const {
      loggedInUser,
      loggedIn,
      loginError,
      loginUser,
      logOutUser
    } = this.props;
    return (
      <header className="header">
        <Link to="/">
          <button className="home">Home</button>
        </Link>
        <h1>NC-News</h1>
        <div>
          <p className="date">{new Date().toDateString()}</p>
          {loginError ? <p className="error">User not found</p> : null}
          {!loggedIn ? (
            <LoginForm loginUser={loginUser} />
          ) : (
            <LogOutForm loggedInUser={loggedInUser} logOutUser={logOutUser} />
          )}
        </div>
      </header>
    );
  }
}

export default Header;
