import React, { Component } from "react";

class SingleArticle extends Component {
  state = {
    article: {
      article_id: 1,
      title: "Living in the shadow of a great man",
      body: "I find this existence challenging",
      votes: 100,
      topic: "mitch",
      author: "butter_bridge",
      created_at: "2018-11-15T12:21:54.171Z",
      comment_count: "13"
    }
  };
  render() {
    const { article } = this.state;
    return (
      <div className="singleArticle">
        <h2>Article</h2>
        <div className="articleHeadings">
          <div>
            <p>Title: {article.title}</p>
            <p>Date: {article.created_at}</p>
          </div>
          <div>
            <p>Author: {article.author}</p>
            <p>Topic: {article.topic}</p>
          </div>
          <p className="articleBody">{article.body}</p>
        </div>
        <div className="articleFooter">
          <div>
            <p>{article.comment_count} comments</p>
            <button>View Comments</button>
          </div>
          <div>
            <p>{article.votes} votes</p>
            <button>Vote</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleArticle;
