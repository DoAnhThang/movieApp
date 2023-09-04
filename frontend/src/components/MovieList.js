/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MovieDetail from "../components/MovieDetail";
import { IMAGE_URL, SERVER_URL } from "../utils/movies-link";

function MovieList({
  category,
  title,
  isPoster,
  selectedId,
  setSelectedId,
  selectedTitle,
  setSelectedTitle,
}) {
  // set state of movies
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // fetch movies based on category
  const fetchMovieCategory = async () => {
    const res = await fetch(`${SERVER_URL}${category}`);
    // if (!res.ok) {
    //   throw new Error("Something went wrong!");
    // }
    const data = await res.json();
    const resMovies = data.results;
    // console.log(data);

    setMovies(resMovies);
  };

  // fetch movies
  useEffect(() => {
    fetchMovieCategory().catch((error) => {
      console.log(`💢 ${error.message} 💢`);
    });
  }, []);

  // show detail of the movie based on id & category
  const clickHandler = (movie) => {
    if (movie.id !== selectedId && title !== selectedTitle) {
      setSelectedMovie(movie);
      setSelectedId(movie.id);
      setSelectedTitle(title);
    }
    if (movie.id === selectedId && title === selectedTitle) {
      setSelectedMovie(null);
      setSelectedId(null);
      setSelectedTitle(null);
    }
    if (movie.id !== selectedId && title === selectedTitle) {
      setSelectedMovie(movie);
      setSelectedId(movie.id);
    }
    if (movie.id === selectedId && title !== selectedTitle) {
      setSelectedMovie(movie);
      setSelectedTitle(title);
    }
  };

  return (
    <div className="container-fluid my-5">
      <h5 className="text-white ms-2">{title}</h5>

      <div
        className="d-flex gap-3 position-relative pb-3 ms-4 movie-list"
        style={{ overflowX: "scroll", overflowY: "hidden" }}
      >
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${IMAGE_URL}${
              isPoster
                ? movie.poster_path
                : movie.backdrop_path || movie.poster_path
            }`}
            alt={movie.title || movie.name}
            onClick={() => clickHandler(movie)}
            className={isPoster ? "h--poster" : "h--backdrop"}
          />
        ))}
      </div>

      {/* show detail of the movie that was clicked on */}
      {selectedMovie &&
        selectedMovie.id === selectedId &&
        title === selectedTitle && <MovieDetail movieData={selectedMovie} />}
    </div>
  );
}

export default MovieList;
