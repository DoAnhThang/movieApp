import React, { Fragment } from "react";
import "./Browse.css";
import NavBar from "./NavBar";
import Banner from "./Banner";
import MovieList from "./MovieList";

function Browse() {
  return (
    <Fragment>
      <Banner />
      <NavBar />
      <MovieList />
    </Fragment>
  );
}

export default Browse;
