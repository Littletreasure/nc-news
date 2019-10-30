import React, { Component } from "react";
import "../styles/articleList.css";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import DropDownBox from "./dropDownBox";

class ArticleList extends Component {
  state = {
    articles: [],
    users: [],
    isLoading: true,
    sort_by: "created_at",
    order: "desc",
    author: ""
  };

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order, author } = this.state;
    const { topic } = this.props;
    const changesort = prevState.sort_by !== this.state.sort_by;
    const changeorder = prevState.order !== this.state.order;
    const filtertopic = prevProps.topic !== this.props.topic;
    const filterauthor = prevState.author !== this.state.author;
    if (changesort || changeorder || filtertopic || filterauthor) {
      api.getArticles(sort_by, order, topic, author).then(articles => {
        this.setState({ articles, isLoading: false });
      });
    }
  }
  componentDidMount() {
    Promise.all([api.getArticles(), api.getUsers()]).then(
      ([articles, users]) => {
        this.setState({ articles, users, isLoading: false });
      }
    );
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
            <DropDownBox
              sortBy={this.sortBy}
              changeOrder={this.changeOrder}
              changeAuthor={this.changeAuthor}
              authors={this.state.users}
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
                    <p>Date: {article.created_at}</p>
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
