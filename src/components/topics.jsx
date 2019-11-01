import React, { Component } from "react";
import "../styles/topics.css";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import AddTopic from "./addTopic.jsx";

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true,
    topicForm: false
  };
  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({ topics, isLoading: false });
    });
  }
  addNewTopic = ({ topic }) => {
    this.setState({ topics: [...this.state.topics, topic], topicForm: false });
  };
  showAddTopic = () => {
    this.setState({ topicForm: true });
  };

  render() {
    const { topics, isLoading, topicForm } = this.state;
    const { loggedInUser } = this.props;
    return (
      <div className="topicList">
        <h3>Topics</h3>
        {isLoading ? null : (
          <div className="topics">
            <Link className="link" to="/articles">
              <h4 key="all">all</h4>
            </Link>
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
          <div>
            <button onClick={this.showAddTopic}>Add Topic</button>
            {!topicForm ? null : <AddTopic addNewTopic={this.addNewTopic} />}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Topics;
