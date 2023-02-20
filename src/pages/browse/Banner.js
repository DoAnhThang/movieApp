import React, { useEffect, useState } from "react";
import "./Banner.css";
import { requests, IMAGE_URL } from "../../movies-link.js";

function Banner() {
  // set state of selected movie
  const [randomMovie, setRandomMovie] = useState({});

  // call API
  useEffect(() => {
    fetchMovies().catch((error) => {
      console.log(`💢 ${error.message} 💢`);
    });
  }, []);

  // fetch movies from The Movie Database API
  const fetchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
    );
    const data = await res.json();

    // select random a movie to display on banner
    const randomKey = Math.floor(Math.random() * data.results.length - 1);
    setRandomMovie(data.results[randomKey]);
  };

  // display movie's overview with limited characters
  function truncate(str, strLength) {
    return str.length > strLength ? `${str.substr(0, strLength - 1)} ...` : str;
  }

  return (
    <div className="banner">
      {/* display image of movie's backdrop */}
      <img
        src={`${IMAGE_URL}${
          randomMovie.backdrop_path
            ? randomMovie.backdrop_path
            : randomMovie.poster_path
        }`}
        alt={`${randomMovie.name}`}
      />
      {/* container of movie's information */}
      <div className="banner-info" key={randomMovie.id}>
        <h1>{randomMovie.name}</h1>
        <button type="button">Play</button>
        <button type="button">My List</button>
        <p>
          {truncate(
            `${
              randomMovie.overview
                ? randomMovie.overview
                : `(${randomMovie.original_name})`
            }`,
            180
          )}
        </p>
      </div>
    </div>
  );
}

export default Banner;
