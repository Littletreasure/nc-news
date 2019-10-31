import React from "react";

function CommentDropDownBox(props) {
  const handleChange = event => {
    if (event.target.id === "sortBy") {
      props.sortBy(event.target.value);
    } else if (event.target.name === "order") {
      props.changeOrder(event.target.value);
    }
    // } else props.changeAuthor(event.target.value);
  };

  return (
    <div className="commentDropDownBox">
      <div>
        <label>
          Sort by:
          <select name="sortBy" id="sortBy" onChange={handleChange}>
            <option value="created_at">Date</option>
            <option value="author">Author</option>
          </select>
        </label>

        <label>
          <input
            type="radio"
            name="order"
            value="asc"
            onChange={handleChange}
          />{" "}
          asc
        </label>
        <label>
          <input
            type="radio"
            name="order"
            value="desc"
            onChange={handleChange}
          />{" "}
          desc
        </label>
      </div>
    </div>
  );
}

export default CommentDropDownBox;
