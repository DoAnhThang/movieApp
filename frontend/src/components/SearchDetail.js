import React from "react";
import MovieDetail from "./MovieDetail";
import { IMAGE_URL } from "../utils/movies-link";

function SearchDetail({ movie, selectedMovie, setSelectedMovie }) {
  return (
    <div className="text-white search-detail">
      <img
        src={`${IMAGE_URL}${movie.poster_path || movie.backdrop_path}`}
        alt={movie.title}
        key={movie.id}
        onClick={() => setSelectedMovie(movie)}
        className="w-100 h-100"
      />

      {/* show detail of the movie that was clicked on */}
      {selectedMovie && movie.id === selectedMovie.id && (
        <MovieDetail movieData={movie} />
      )}
    </div>
  );
}

export default SearchDetail;
