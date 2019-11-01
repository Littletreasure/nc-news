import React, { Component } from "react";

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <center>
          {this.props.error ? (
            <div>
              <h1>{this.props.errStatus} Error</h1>
              <h2>{this.props.error}</h2>
            </div>
          ) : (
            <div>
              <h1>404 Error</h1>
              <h2>Page not found</h2>
            </div>
          )}
        </center>
      </div>
    );
  }
}

export default ErrorPage;
