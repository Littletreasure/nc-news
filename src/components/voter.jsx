import React, { Component } from "react";
import * as api from "../utils/api";

class Voter extends Component {
  state = {
    type: null,
    id: null,
    votes: null
  };
  componentDidMount() {
    const { type, id, votes } = this.props;
    this.setState({ type, id, votes });
  }

  voteClick = event => {
    const { type, id, votes } = this.state;
    let vote;
    if (event.target.className === "voteminus") {
      vote = -1;
    } else vote = 1;

    if (type === "article") {
      api.updateArticleVote(id, vote).then(article => {
        this.setState({ votes: votes + vote });
      });
    } else {
      api.updateCommentVote(id, vote).then(comment => {
        this.setState({ votes: votes + vote });
      });
    }
  };

  render() {
    const { id, votes } = this.state;
    return (
      <div>
        <p>{votes} votes</p>
        <button className={`voteminus`} id={id} onClick={this.voteClick}>
          -
        </button>{" "}
        Vote{" "}
        <button className={`voteplus`} id={id} onClick={this.voteClick}>
          +
        </button>
      </div>
    );
  }
}

export default Voter;
