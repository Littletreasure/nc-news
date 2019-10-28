import React from "react";
import "../App.css";

const Header = () => {
  return (
    <header className="header">
      <h1>NC-News</h1>
      <div>
        <p>{new Date().toDateString()}</p>
        <button>Home</button>
      </div>
    </header>
  );
};

export default Header;
