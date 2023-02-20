/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./MovieRow.css";
import MovieDetail from "./MovieDetail";

function MovieRow({ category, title, isPoster }) {
  // set state of movies
  const [movies, setMovies] = useState([]);

  // call API
  useEffect(() => {
    fetchMovieCategory().catch((error) => {
      console.log(`💢 ${error.message} 💢`);
    });
  }, []);

  // fetch movies from The Movie Database API
  const fetchMovieCategory = async () => {
    const res = await fetch(`https://api.themoviedb.org/3${category}`);
    if (!res.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await res.json();
    const resMovies = data.results;

    setMovies(resMovies);
  };

  return (
    <div className="movie-row">
      <h3>{title}</h3>
      <div className="movie-row__item">
        {/* pass movies data to child component to display */}
        {movies.map((movie) => (
          <MovieDetail
            key={movie.id}
            movie={movie}
            isPoster={isPoster}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
