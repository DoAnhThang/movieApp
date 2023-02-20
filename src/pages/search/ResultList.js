/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import "./ResultList.css";
import MoviesContext from "../../Context/MoviesContext";
import MovieDetail from "../browse/MovieDetail";

function ResultList() {
  // exchange data with context
  const { searchedMovies } = useContext(MoviesContext);

  return (
    <div className="result-list">
      <h4>Search Result</h4>

      {/* show notification when have no result */}
      {searchedMovies.length === 0 && (
        <p className="search-no-result">No Result!</p>
      )}

      {/* show the movies have been searched */}
      <div className="result-card">
        {searchedMovies.map((movie) => (
          <MovieDetail
            key={movie.id}
            movie={movie}
            isPoster={true}
            category={`Search Result`}
          />
        ))}
      </div>
    </div>
  );
}

export default ResultList;
