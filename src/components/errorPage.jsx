import React, { Component } from "react";

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <center>
          <h1>Error</h1>
          {this.props.error ? (
            <h2>{this.props.error}</h2>
          ) : (
            <h2>Page not found</h2>
          )}
        </center>
      </div>
    );
  }
}

export default ErrorPage;
