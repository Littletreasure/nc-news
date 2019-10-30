import React from "react";
import "../styles/header.css";
import { Link } from "@reach/router";

const Header = () => {
  return (
    <header className="header">
      <h1>NC-News</h1>
      <div>
        <p className="date">{new Date().toDateString()}</p>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
