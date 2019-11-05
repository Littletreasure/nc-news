import React, { Component } from "react";
import * as api from "../utils/api";
import "../styles/App.css";

class Voter extends Component {
  state = {
    votes: null,
    votedArticle: null,
    votedComment: null
  };

  componentDidMount() {
    const { votes } = this.props;
    this.setState({ votes });
  }

  voteClick = event => {
    const { votes, votedArticle, votedComment } = this.state;
    const { loggedInUser, type, id } = this.props;
    let vote;
    if (event.target.className === "voteminus") {
      vote = -1;
    } else vote = 1;
    if (type === "article" && votedArticle !== loggedInUser) {
      api.updateArticleVote(id, vote).then(article => {
        this.setState({
          votes: votes + vote,
          votedArticle: this.props.loggedInUser
        });
      });
    } else if (type === "comment" && votedComment !== loggedInUser) {
      api.updateCommentVote(id, vote).then(comment => {
        this.setState({
          votes: votes + vote,
          votedComment: this.props.loggedInUser
        });
      });
    }
  };

  render() {
    const { votes } = this.state;
    const { loggedInUser, id } = this.props;
    return (
      <div>
        <p>{votes} votes</p>
        {loggedInUser ? (
          <div className="vote">
            <button className={`voteminus`} id={id} onClick={this.voteClick}>
              -
            </button>
            Vote
            <button className={`voteplus`} id={id} onClick={this.voteClick}>
              +
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Voter;
