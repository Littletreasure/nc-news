import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import "../styles/singleArticle.css";
import * as api from "../utils/api";
import Comments from "./comments.jsx";
import Voter from "./voter.jsx";

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    commentChanged: false
  };

  componentDidMount() {
    api.getArticleById(this.props.article_id).then(article => {
      this.setState({ article, isLoading: false });
    });
  }
  // commentChanged = () => {
  //   this.setState({ commentChanged: true });
  // };

  updateCommentCount = num => {
    const { comment_count } = this.state.article;
    const newCount = parseInt(comment_count, 10) + num;
    const newArticle = { ...this.state.article };
    newArticle.comment_count = newCount;
    this.setState({ article: newArticle });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const { comment_count } = this.state.article;
  //   const changecomment = prevState.article.comment_count !== comment_count;
  //   if (changecomment) {
  //     api.getArticleById(this.props.article_id).then(article => {
  //       this.setState({ article, isLoading: false });
  //     });
  //   }
  // }

  render() {
    const { article, isLoading } = this.state;
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
                  <p></p>
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
