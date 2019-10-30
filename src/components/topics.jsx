import React, { Component } from "react";
import "../styles/topics.css";
import * as api from "../utils/api";
import { Link } from "@reach/router";

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true
  };
  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({ topics, isLoading: false });
    });
  }

  render() {
    const { topics, isLoading } = this.state;
    return (
      <div className="topicList">
        <h3>Topics</h3>
        {isLoading ? null : (
          <div className="topics">
            {topics.map(topic => {
              return (
                <div>
                  <Link to={`/articles/topic/${topic.slug}`}>
                    <p key={topic.slug}>{topic.slug}</p>
                  </Link>
                  <p key="{topic.description">{topic.description}</p>
                </div>
              );
            })}
            <Link to="/articles">
              <p>all</p>
            </Link>
          </div>
        )}
        <p></p>
        <button>Add Topic</button>
      </div>
    );
  }
}

export default Topics;
