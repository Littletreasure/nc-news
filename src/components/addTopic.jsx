import React, { Component } from "react";
import * as api from "../utils/api";

class AddTopic extends Component {
  state = {
    slug: "",
    desc: ""
  };

  handleChange = event => {
    const { id } = event.target;
    this.setState({ [id]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    api.postTopic(this.state.slug, this.state.desc).then(topic => {
      this.props.addNewTopic(topic);
      this.setState({ slug: "", desc: "" });
    });
  };

  render() {
    return (
      <div>
        <p></p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Slug:
            <input id="slug" type="text" onChange={this.handleChange}></input>
          </label>
          <label>
            Description:
            <input id="desc" type="text" onChange={this.handleChange}></input>
          </label>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

export default AddTopic;
