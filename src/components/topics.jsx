import React, { Component } from "react";

class Topics extends Component {
  state = {
    topics: [
      { slug: "mitch", description: "The man, the Mitch, the legend" },
      { slug: "cats", description: "Not dogs" },
      { slug: "paper", description: "what books are made of" }
    ]
  };

  render() {
    return (
      <div className="topicList">
        <h3>Topics</h3>
        <div>
          {this.state.topics.map(topic => {
            return <p key={topic.slug}>{topic.slug}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default Topics;
