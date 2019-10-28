import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/header.jsx";
import Topics from "./components/topics.jsx";
import ArticleList from "./components/articleList.jsx";
import SingleArticle from "./components/singleArticle.jsx";
import Comments from "./components/comments.jsx";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="body">
          <Topics />
          <div className="content">
            <Router>
              <ArticleList path="/" />
              <ArticleList path="/articles" />
              <SingleArticle path="/articles/:id" />
              <Comments path="/articles/:id/comments" />
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
