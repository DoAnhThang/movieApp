import React from "react";
import "./Search.css";
import NavBar from "../browse/NavBar";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import { MoviesContextProvider } from "../../Context/MoviesContext";

// set context and pass data to child components
const Search = () => {
  return (
    <MoviesContextProvider>
      <NavBar />
      <SearchForm />
      <ResultList />
    </MoviesContextProvider>
  );
};

export default Search;
