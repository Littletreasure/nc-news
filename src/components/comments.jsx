import React, { Component } from "react";
import "../styles/comments.css";
import * as api from "../utils/api";
import Voter from "./voter.jsx";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true
  };

  componentDidMount() {
    api.getCommentsByArticleId(this.props.article_id).then(comments => {
      this.setState({ comments, isLoading: false });
    });
  }

  render() {
    const { comments, isLoading } = this.state;

    return (
      <div className="comments">
        <h3>Comments</h3>
        {isLoading ? (
          <p className="loading">Loading ...</p>
        ) : (
          <div>
            <button className="addComment">Add Comment</button>
            {comments.map(comment => {
              return (
                <div key={comment.comment_id} className="commentCard">
                  <div className="commentHeader">
                    <p>Author: {comment.author}</p>
                    <p>Date: {comment.created_at}</p>
                  </div>
                  <div className="commentBody">
                    <p>Comment: {comment.body}</p>
                  </div>
                  <Voter
                    type="comment"
                    id={comment.comment_id}
                    votes={comment.votes}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Comments;
