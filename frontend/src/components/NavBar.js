import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  // set state of NavBar
  const [navBlack, setNavBlack] = useState(false);

  // catch event when scroll the screen > 100px
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 100 ? setNavBlack(true) : setNavBlack(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <nav
      className={`container-fluid navbar d-flex fixed-top px-3 ${
        navBlack && "bg-dark"
      }`}
      style={{ zIndex: 10 }}
    >
      {/* display app's name */}
      <NavLink
        to="/"
        className="navbar-brand text-danger text-decoration-none fw-bold"
      >
        Movie App
      </NavLink>

      {/* go to search page when click on icon */}
      <NavLink to="/search" target="_blank">
        <svg
          className="svg-inline--fa fa-search fa-w-16"
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{ width: "1.7rem" }}
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </NavLink>
    </nav>
  );
}

export default NavBar;
