import React from "react";

function ArticleDropDownBox(props) {
  return (
    <div className="articleDropDownBox">
      <div>
        <label>
          Sort by:
          <select name="sortBy" id="sortBy" onChange={props.handleChange}>
            <option value="created_at">Date</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="topic">Topic</option>
          </select>
        </label>

        <label>
          <input
            type="radio"
            name="order"
            value="asc"
            onChange={props.handleChange}
          />
          asc
        </label>
        <label>
          <input
            type="radio"
            name="order"
            value="desc"
            onChange={props.handleChange}
          />
          desc
        </label>
      </div>
      <div>
        <label>
          Filter by author:
          <select name="filter" id="filter" onChange={props.handleChange}>
            <option value="">all</option>
            {props.authors.map(author => {
              return (
                <option
                  key={author.username}
                  value={author.username}
                >{`${author.username}`}</option>
              );
            })}
          </select>
        </label>
      </div>
    </div>
  );
}

export default ArticleDropDownBox;
