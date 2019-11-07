import React, { Component } from "react";
import * as api from "../utils/api";
import "../styles/App.css";

class Voter extends Component {
  state = {
    voteChange: 0,
    votedArticle: null,
    votedComment: null,
    alreadyVoted: null
  };

  voteClick = event => {
    const { votedArticle, votedComment } = this.state;
    const { loggedInUser, type, id } = this.props;
    let vote;
    if (event.target.className === "voteminus") {
      vote = -1;
    } else vote = 1;
    if (type === "article" && votedArticle !== loggedInUser) {
      api.updateArticleVote(id, vote);
      this.setState({
        voteChange: vote,
        votedArticle: this.props.loggedInUser,
        alreadyVoted: null
      });
    } else if (type === "comment" && votedComment !== loggedInUser) {
      api.updateCommentVote(id, vote);
      this.setState({
        voteChange: vote,
        votedComment: this.props.loggedInUser,
        alreadyVoted: null
      });
    } else if (
      (type === "article" && votedArticle === loggedInUser) ||
      (type === "comment" && votedComment === loggedInUser)
    ) {
      this.setState({ alreadyVoted: "Only 1 vote allowed" });
    }
  };

  render() {
    const { voteChange, alreadyVoted } = this.state;
    const { loggedInUser, id, votes } = this.props;
    return (
      <div className="voteForm">
        <p>{votes + voteChange} votes</p>
        {loggedInUser ? (
          <div className="vote">
            <button className={`voteminus`} id={id} onClick={this.voteClick}>
              -
            </button>
            Vote
            <button className={`voteplus`} id={id} onClick={this.voteClick}>
              +
            </button>
            {alreadyVoted}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Voter;
