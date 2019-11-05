import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import "../styles/singleArticle.css";
import * as api from "../utils/api";
import Comments from "./comments.jsx";
import Voter from "./voter.jsx";
import ErrorPage from "./errorPage.jsx";

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    error: null,
    errStatus: null
  };

  componentDidMount() {
    api
      .getArticleById(this.props.article_id)
      .then(article => {
        this.setState({ article, isLoading: false, error: null });
      })
      .catch(err => {
        this.setState({
          error: err.response.data.msg,
          errStatus: err.response.status
        });
      });
  }

  updateCommentCount = num => {
    const { comment_count } = this.state.article;
    const newCount = parseInt(comment_count, 10) + num;
    const newArticle = { ...this.state.article };
    newArticle.comment_count = newCount;
    this.setState({ article: newArticle });
  };

  render() {
    const { article, isLoading, error, errStatus } = this.state;
    if (error) {
      return <ErrorPage error={error} errStatus={errStatus} />;
    } else
      return (
        <div className="singleArticle">
          <div className="articleMain">
            <h2>{article.title}</h2>
            {isLoading ? (
              <p className="loading">Loading ...</p>
            ) : (
              <div>
                <div className="articleHeadings">
                  <div>
                    <p>Author: {article.author}</p>
                    <p>Date: {article.created_at}</p>
                  </div>
                  <div>
                    <p>Topic: {article.topic}</p>
                  </div>
                </div>
                <div className="articleBody">
                  <p>{article.body}</p>
                </div>
                <div className="articleFooter">
                  <div>
                    <p>{article.comment_count} comments</p>
                    <Link to={"comments"}>
                      <button>View Comments</button>
                    </Link>
                  </div>
                  <Voter
                    type="article"
                    id={article.article_id}
                    votes={article.votes}
                    loggedInUser={this.props.loggedInUser}
                  />
                </div>
              </div>
            )}
          </div>
          <Router>
            <Comments
              loggedInUser={this.props.loggedInUser}
              path="comments"
              article_id={article.article_id}
              updateCommentCount={this.updateCommentCount}
            />
          </Router>
        </div>
      );
  }
}

export default SingleArticle;
