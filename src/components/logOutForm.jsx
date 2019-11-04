import React, { Component } from "react";
import "../styles/header.css";

class LogOutForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.logOutUser();
  };
  render() {
    const { loggedInUser } = this.props;
    return (
      <form id="out" onSubmit={this.handleSubmit}>
        <p className="user">
          {`${loggedInUser} `}
          <button type="submit">Log Out</button>
        </p>
      </form>
    );
  }
}

export default LogOutForm;
