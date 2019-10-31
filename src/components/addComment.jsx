import React, { Component } from "react";
import * as api from "../utils/api";

class AddComment extends Component {
  state = {
    comment: ""
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
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Username: {this.props.loggedInUser}</label>
          <p></p>
          <label className="commenttext">
            Comment:
            <input type="text" size="80" onChange={this.handleChange}></input>
            <p></p>
          </label>
          <button type="submit">Add Comment</button>
        </form>
        <p></p>
      </div>
    );
  }
}

export default AddComment;
