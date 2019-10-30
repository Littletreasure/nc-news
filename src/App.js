import React, { Component } from "react";
import "./styles/App.css";
import { Router } from "@reach/router";
import Header from "./components/header.jsx";
import Topics from "./components/topics.jsx";
import ArticleList from "./components/articleList.jsx";
import SingleArticle from "./components/singleArticle.jsx";

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
              <ArticleList path="/articles/topic/:topic" />
              <SingleArticle path="/articles/:article_id/*" />
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
