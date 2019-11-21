import React, { Component } from "react";
import "../styles/comments.css";
import * as api from "../utils/api";
import Voter from "./voter.jsx";
import AddComment from "./addComment.jsx";
import CommentDropDownBox from "./commentDropDownBox.jsx";
import ErrorPage from "./errorPage.jsx";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    commentForm: false,
    sort_by: "created_at",
    order: "desc",
    error: null,
    errStatus: null
  };

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    const { article_id } = this.props;
    const changesort = prevState.sort_by !== sort_by;
    const changeorder = prevState.order !== order;
    if (changesort || changeorder) {
      api
        .getCommentsByArticleId(article_id, sort_by, order)
        .then(comments => {
          this.setState({ comments, isLoading: false });
        })
        .catch(err => {
          this.setState({
            error: err.response.data.msg,
            errStatus: err.response.status
          });
        });
    }
  }
  componentDidMount() {
    const { article_id } = this.props;
    api
      .getCommentsByArticleId(article_id)
      .then(comments => {
        this.setState({ comments, isLoading: false });
      })
      .catch(err => {
        this.setState({
          error: err.response.data.msg,
          errStatus: err.response.status
        });
      });
  }
  addNewComment = ({ comment }) => {
    this.setState(currentState => {
      return { comments: [comment, ...currentState.comments] };
    });
    this.props.updateCommentCount(1);
  };

  handleDeleteClick = event => {
    const id = parseInt(event.target.id, 10);
    api
      .deleteComment(event.target.id)
      .then(response => {
        this.setState(currentState => {
          const newComments = currentState.comments.filter(comment => {
            return comment.comment_id !== id;
          });
          return { comments: newComments };
        });
        this.props.updateCommentCount(-1);
      })
      .catch(err => {
        this.setState({
          error: err.response.data.msg,
          errStatus: err.response.status
        });
      });
  };

  handleChange = event => {
    const { id, name, value } = event.target;
    if (id === "sortBy") {
      this.setState({ sort_by: value });
    } else if (name === "order") {
      this.setState({ order: value });
    }
  };
  render() {
    const { comments, isLoading, error, errStatus } = this.state;
    if (error) {
      return <ErrorPage error={error} errStatus={errStatus} />;
    } else
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
                <CommentDropDownBox handleChange={this.handleChange} />
              </div>
              {comments.map(comment => {
                return (
                  <section key={comment.comment_id} className="commentCard">
                    <div className="commentHeader">
                      <p>Author: {comment.author}</p>
                      <p>
                        Date: {new Date(comment.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="commentBody">
                      <p>Comment: {comment.body}</p>
                    </div>
                    <div className="commentFooter">
                      <Voter
                        type="comment"
                        id={comment.comment_id}
                        votes={comment.votes}
                        loggedInUser={this.props.loggedInUser}
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
                  </section>
                );
              })}
            </div>
          )}
        </div>
      );
  }
}

export default Comments;
