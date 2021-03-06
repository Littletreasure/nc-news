import React, { Component } from "react";
import "../styles/header.css";

class LoginForm extends Component {
  state = {
    user: ""
  };

  handleChange = event => {
    this.setState({ user: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.loginUser(this.state.user);
  };
  render() {
    return (
      <form className="login" id="in" onSubmit={this.handleSubmit}>
        e.g. 'jessjelly'
        <input
          className="loginInput"
          type="text"
          onChange={this.handleChange}
        ></input>
        <button type="submit">Log In</button>
      </form>
    );
  }
}

export default LoginForm;
