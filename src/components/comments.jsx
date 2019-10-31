import React, { Component } from "react";
import "../styles/comments.css";
import * as api from "../utils/api";
import Voter from "./voter.jsx";
import AddComment from "./addComment.jsx";
import CommentDropDownBox from "./commentDropDownBox.jsx";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    commentForm: false,
    sort_by: "created_at",
    order: "desc"
  };

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    const changesort = prevState.sort_by !== sort_by;
    const changeorder = prevState.order !== order;
    if (changesort || changeorder) {
      api
        .getCommentsByArticleId(this.props.article_id, sort_by, order)
        .then(comments => {
          this.setState({ comments, isLoading: false });
        });
    }
  }

  componentDidMount() {
    api.getCommentsByArticleId(this.props.article_id).then(comments => {
      this.setState({ comments, isLoading: false });
    });
  }
  addNewComment = ({ comment }) => {
    this.setState({
      comments: [comment, ...this.state.comments]
    });
    this.props.updateCommentCount(1);
  };

  handleDeleteClick = event => {
    const id = parseInt(event.target.id, 10);
    api.deleteComment(event.target.id).then(response => {
      const newComments = this.state.comments.filter(comment => {
        return comment.comment_id !== id;
      });
      this.setState({ comments: newComments });
      this.props.updateCommentCount(-1);
    });
  };

  sortBy = sort_by => {
    this.setState({ sort_by: sort_by });
  };
  changeOrder = order => {
    this.setState({ order: order });
  };

  render() {
    const { comments, isLoading } = this.state;

    return (
      <div className="comments">
        <h3>Comments</h3>
        {!this.props.loggedInUser ? null : (
          <AddComment
            addNewComment={this.addNewComment}
            article_id={this.props.article_id}
            loggedInUser={this.props.loggedInUser}
          />
        )}

        {isLoading ? (
          <p className="loading">Loading ...</p>
        ) : (
          <div>
            <div className="commentButtons">
              <p></p>
              <CommentDropDownBox
                sortBy={this.sortBy}
                changeOrder={this.changeOrder}
              />
            </div>
            {comments.map(comment => {
              return (
                <div key={comment.comment_id} className="commentCard">
                  <div className="commentHeader">
                    <p>Author: {comment.author}</p>
                    <p>Date: {new Date(comment.created_at).toLocaleString()}</p>
                  </div>
                  <div className="commentBody">
                    <p>Comment: {comment.body}</p>
                  </div>
                  <div className="commentFooter">
                    <Voter
                      type="comment"
                      id={comment.comment_id}
                      votes={comment.votes}
                    />
                    {this.props.loggedInUser !== comment.author ? null : (
                      <button
                        id={comment.comment_id}
                        onClick={this.handleDeleteClick}
                        className="delete"
                      >
                        Delete
                      </button>
                    )}
                  </div>
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
