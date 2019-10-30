import React from "react";

function DropDownBox(props) {
  const handleChange = event => {
    console.log(event.target);
    if (event.target.id === "sortBy") {
      props.sortBy(event.target.value);
    } else if (event.target.name === "order") {
      props.changeOrder(event.target.value);
    } else props.changeAuthor(event.target.value);
  };

  return (
    <div className="dropDownBox">
      <div>
        <label>
          Sort by:
          <select name="sortBy" id="sortBy" onChange={handleChange}>
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
      <div>
        <label>
          {" "}
          Filter by author:
          <select name="filter" id="filter" onChange={handleChange}>
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

export default DropDownBox;
