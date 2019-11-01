import React, { Component } from "react";
import "../styles/articleList.css";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import ArticleDropDownBox from "./articleDropDownBox";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    author: "",
    error: null
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
          this.setState({ articles, isLoading: false });
        })
        .catch(err => {
          console.dir(err);
        });
    }
  }
  componentDidMount() {
    api.getArticles().then(articles => {
      this.setState({ articles, isLoading: false });
    });
  }
  changeAuthor = author => {
    this.setState({ author: author });
  };
  sortBy = sort_by => {
    this.setState({ sort_by: sort_by });
  };
  changeOrder = order => {
    this.setState({ order: order });
  };
  render() {
    const { isLoading, articles } = this.state;
    return (
      <div className="articleList">
        <h2>Articles</h2>

        {isLoading ? (
          <p className="loading">Loading ...</p>
        ) : (
          <div>
            <ArticleDropDownBox
              sortBy={this.sortBy}
              changeOrder={this.changeOrder}
              changeAuthor={this.changeAuthor}
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
                    <p>Date: {new Date(article.created_at).toLocaleString()}</p>
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
