import React, { Component } from "react";
import * as api from "../utils/api";
import ErrorPage from "./errorPage.jsx";

class AddComment extends Component {
  state = {
    comment: "",
    error: null,
    errStatus: null
  };

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    api
      .postComment(
        this.props.article_id,
        this.props.loggedInUser,
        this.state.comment
      )
      .then(comment => {
        this.setState({ comment: "" });
        this.props.addNewComment(comment);
      })
      .catch(err => {
        this.setState({
          error: err.response.data.msg,
          errStatus: err.response.status
        });
      });
  };
  render() {
    const { error, errStatus } = this.state;
    if (error) {
      return <ErrorPage error={error} errStatus={errStatus} />;
    } else
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Username: {this.props.loggedInUser}</label>
            <div className="commenttext">
              <label>
                Comment:
                <input
                  type="text"
                  size="80"
                  value={this.state.comment}
                  onChange={this.handleChange}
                  required
                ></input>
              </label>
            </div>
            <button type="submit">Add Comment</button>
          </form>
        </div>
      );
  }
}

export default AddComment;
