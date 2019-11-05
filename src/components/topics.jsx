import React, { Component } from "react";
import "../styles/topics.css";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import AddTopic from "./addTopic.jsx";
import ErrorPage from "./errorPage.jsx";

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true,
    topicForm: false,
    error: null,
    errStatus: null
  };
  componentDidMount() {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics, isLoading: false });
      })
      .catch(err => {
        this.setState({
          error: err.response.data.msg,
          errStatus: err.response.status
        });
      });
  }
  addNewTopic = ({ topic }) => {
    this.setState(currentState => {
      return { topics: [...currentState.topics, topic], topicForm: false };
    });
  };
  showAddTopic = () => {
    this.setState({ topicForm: true });
  };

  render() {
    const { topics, isLoading, topicForm, error, errStatus } = this.state;
    const { loggedInUser } = this.props;
    if (error) {
      return <ErrorPage error={error} errStatus={errStatus} />;
    } else
      return (
        <div className="topicList">
          <h3>Topics</h3>
          {isLoading ? null : (
            <div className="topics">
              <div>
                <Link className="link" to="/articles">
                  <h4 key="all">all</h4>
                </Link>
              </div>
              {topics.map(topic => {
                return (
                  <div key={topic.slug}>
                    <Link className="link" to={`/articles/topic/${topic.slug}`}>
                      <h4>{topic.slug}</h4>
                    </Link>
                    <p>{topic.description}</p>
                  </div>
                );
              })}
            </div>
          )}
          {loggedInUser ? (
            <div className="addtopic">
              <button onClick={this.showAddTopic}>Add Topic</button>
              {!topicForm ? null : <AddTopic addNewTopic={this.addNewTopic} />}
            </div>
          ) : null}
        </div>
      );
  }
}

export default Topics;
