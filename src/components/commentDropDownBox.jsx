import React from "react";

function CommentDropDownBox(props) {
  return (
    <div className="commentDropDownBox">
      <div>
        <label>
          Sort by:
          <select name="sortBy" id="sortBy" onChange={props.handleChange}>
            <option value="created_at">Date</option>
            <option value="author">Author</option>
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
    </div>
  );
}

export default CommentDropDownBox;
