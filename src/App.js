import React, { Component } from "react";
import "./styles/App.css";
import { Router } from "@reach/router";
import Header from "./components/header.jsx";
import Topics from "./components/topics.jsx";
import ArticleList from "./components/articleList.jsx";
import SingleArticle from "./components/singleArticle.jsx";
import * as api from "./utils/api";

class App extends Component {
  state = {
    users: [],
    isLoading: true,
    user: "",
    loggedInUser: null,
    loggedIn: false,
    loginError: false
  };
  componentDidMount() {
    api.getUsers().then(users => {
      this.setState({ users, isLoading: false });
    });
  }

  loginUser = user => {
    const { users } = this.state;
    if (users.findIndex(item => item.username === user) !== -1) {
      this.setState({ loggedInUser: user, loggedIn: true });
    } else {
      this.setState({ loginError: true });
    }
  };

  logOutUser = () => {
    this.setState({ loggedInUser: "", loggedIn: false });
  };

  render() {
    const { isLoading, users, loggedInUser, loggedIn, loginError } = this.state;
    return (
      <div>
        {isLoading ? null : (
          <div className="app">
            <Header
              loggedInUser={loggedInUser}
              loggedIn={loggedIn}
              loginError={loginError}
              loginUser={this.loginUser}
              logOutUser={this.logOutUser}
            />
            <div className="body">
              <Topics />
              <div className="content">
                <Router>
                  <ArticleList path="/" users={users} />
                  <ArticleList path="/articles" users={users} />
                  <ArticleList path="/articles/topic/:topic" users={users} />
                  <SingleArticle
                    loggedInUser={loggedInUser}
                    path="/articles/:article_id/*"
                  />
                </Router>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
