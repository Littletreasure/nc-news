import React, { Component } from "react";
import "../styles/articleList.css";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import ArticleDropDownBox from "./articleDropDownBox";
import ErrorPage from "./errorPage.jsx";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    author: "",
    error: null,
    errStatus: null
  };

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order, author } = this.state;
    const { topic } = this.props;
    const changesort = prevState.sort_by !== sort_by;
    const changeorder = prevState.order !== order;
    const filtertopic = prevProps.topic !== topic;
    const filterauthor = prevState.author !== author;
    if (changesort || changeorder || filtertopic || filterauthor) {
      api
        .getArticles(sort_by, order, topic, author)
        .then(articles => {
          this.setState({ articles, isLoading: false, error: null });
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
    const { sort_by, order, author } = this.state;
    const { topic } = this.props;
    api
      .getArticles(sort_by, order, topic, author)
      .then(articles => {
        this.setState({ articles, isLoading: false, error: null });
      })
      .catch(err => {
        this.setState({
          error: err.response.data.msg,
          errStatus: err.response.status
        });
      });
  }

  handleChange = event => {
    const { value, id, name } = event.target;
    if (id === "sortBy") {
      this.setState({ sort_by: value });
    } else if (name === "order") {
      this.setState({ order: value });
    } else this.setState({ author: value });
  };

  render() {
    const { isLoading, articles, error, errStatus } = this.state;
    if (error) {
      return <ErrorPage error={error} errStatus={errStatus} />;
    } else
      return (
        <div className="articleList">
          <h2>Articles</h2>
          {isLoading ? (
            <p className="loading">Loading ...</p>
          ) : (
            <div>
              <ArticleDropDownBox
                handleChange={this.handleChange}
                authors={this.props.users}
              />
              {articles.map(article => {
                return (
                  <div key={article.article_id} className="articleCard">
                    <div>
                      <p>
                        Title:{" "}
                        <Link to={`/articles/${article.article_id}`}>
                          {article.title}
                        </Link>
                      </p>
                      <p>Topic: {article.topic}</p>
                    </div>
                    <div>
                      <p>Author: {article.author}</p>
                      <p>
                        Date: {new Date(article.created_at).toLocaleString()}
                      </p>
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

export default ArticleList;
