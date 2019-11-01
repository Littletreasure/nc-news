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
      <form id="in" onSubmit={this.handleSubmit}>
        <input
          placeholder="e.g. 'jessjelly'"
          type="text"
          onChange={this.handleChange}
        ></input>
        <button type="submit">Log In</button>
      </form>
    );
  }
}

export default LoginForm;
