import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import "../styles/singleArticle.css";
import * as api from "../utils/api";
import Comments from "./comments.jsx";

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true
  };

  componentDidMount() {
    api.getArticleById(this.props.article_id).then(article => {
      this.setState({ article, isLoading: false });
    });
  }

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
                <div>
                  <p>{article.votes} votes</p>
                  <button>Vote</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Router>
          <Comments path="comments" />
        </Router>
      </div>
    );
  }
}

export default SingleArticle;
