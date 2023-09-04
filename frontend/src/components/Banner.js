import React, { useEffect, useState } from "react";
import { requests, IMAGE_URL, SERVER_URL } from "../utils/movies-link";

function Banner() {
  // set state of selected random movie
  const [randomMovie, setRandomMovie] = useState({});

  // fetch Netflix Originals movies
  const fetchMovies = async () => {
    const res = await fetch(`${SERVER_URL}${requests.fetchTrending}`);
    const data = await res.json();
    // console.log("fetchMovies: ", data);

    // select random a movie to display on banner
    const randomKey = Math.floor(Math.random() * data.results.length);
    setRandomMovie(data.results[randomKey]);
    // setRandomMovie(data.results[4]);
  };

  // fetch Netflix Originals movies
  useEffect(() => {
    fetchMovies().catch((error) => {
      console.log(`💢 ${error.message} 💢`);
    });
  }, []);

  // display movie's overview with limited characters
  function truncate(str, strLength) {
    return str.length > strLength ? `${str.substr(0, strLength - 1)} ...` : str;
  }

  return (
    <header
      className="container-fluid d-flex align-items-end text-light banner"
      style={{
        backgroundImage: `url(
          ${IMAGE_URL}${
          randomMovie.backdrop_path
            ? randomMovie.backdrop_path
            : randomMovie.poster_path
        }
          )`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "60vh",
      }}
    >
      <div className="row p-3">
        <div className="col-12 col-md-9 col-lg-6 bg-secondary bg-opacity-50 rounded p-3">
          <h1 className="mb-4">{randomMovie.title || randomMovie.name}</h1>
          <button className="btn btn-secondary fw-bold rounded-1 me-3">
            Play
          </button>
          <button className="btn btn-secondary fw-bold rounded-1">
            My List
          </button>
          <p className="mt-2 mb-0">
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
    </header>
  );
}

export default Banner;
