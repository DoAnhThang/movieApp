/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useCallback } from "react";
import "./MovieDetail.css";
import { IMAGE_URL } from "../../movies-link.js";
import YouTube from "react-youtube";
import { MoviesContext } from "../../Context/MoviesContext";

function MovieDetail({ movie, isPoster, category }) {
  // exchange data with context
  const {
    activatedId,
    setActivatedId,
    activatedCategory,
    setActivatedCategory,
  } = useContext(MoviesContext);

  // set state when click a movie's picture
  const [showDetail, setShowDetail] = useState(false);

  // set state of video will be showed
  const [trailer, setTrailer] = useState([]);

  // fetch videos from The Movie Database API
  const fetchTrailerHandler = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3//movie/${movie.id}/videos?api_key=580391f713822f6d4efc83841608050f`
      );
      const data = await res.json();
      const resVideos = data.results;

      // filter YouTube videos
      if (resVideos !== []) {
        let filteredVideo = [];
        filteredVideo = resVideos.filter(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        if (filteredVideo === []) {
          filteredVideo = resVideos.filter(
            (video) => video.site === "YouTube" && video.type === "Teaser"
          );
        }

        setTrailer(filteredVideo);
      }
    } catch (error) {
      console.log(`💢 ${error.message} 💢`);
    }

    showDetailHandler();
    // update function when dependencies have change
  }, [activatedId, activatedCategory, showDetail]);

  // function show movie's detail when click picture
  const showDetailHandler = () => {
    if (movie.id !== activatedId && category !== activatedCategory) {
      setActivatedId(movie.id);
      setActivatedCategory(category);
      setShowDetail(true);
    }
    if (movie.id === activatedId && category === activatedCategory) {
      setShowDetail(!showDetail);
    }
    if (movie.id !== activatedId && category === activatedCategory) {
      setActivatedId(movie.id);
      setShowDetail(true);
    }
    if (movie.id === activatedId && category !== activatedCategory) {
      setActivatedCategory(category);
      setShowDetail(true);
    }
  };

  // format size of YouTube component
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
      origin: "https://www.youtube.com/",
    },
  };

  return (
    <div>
      <img
        src={`${IMAGE_URL}${
          isPoster
            ? movie.poster_path
            : movie.backdrop_path
            ? movie.backdrop_path
            : movie.poster_path
        }`}
        alt={movie.title}
        className={`movie-row__img ${isPoster ? "img-poster" : "img-backdrop"}`}
        onClick={fetchTrailerHandler}
      />
      {/* show movie's detail following id and category */}
      {movie.id === activatedId &&
        category === activatedCategory &&
        showDetail && (
          <div className="movie-detail">
            <div className="movie-detail__info">
              <h3>{movie.title || movie.name}</h3>
              <h5>
                Release Date: {movie.release_date || movie.first_air_date}
              </h5>
              <h5>Vote: {movie.vote_average} / 10</h5>
              <p>
                {movie.overview
                  ? movie.overview
                  : "Have no overview available currently!"}
              </p>
            </div>

            {/* show movie's video when have a suitability */}
            {trailer.length > 0 ? (
              <YouTube
                videoId={trailer[0].key}
                opts={opts}
                className="movie-detail__video"
              />
            ) : (
              <img
                src={`${IMAGE_URL}${
                  movie.backdrop_path ? movie.backdrop_path : movie.poster_path
                }`}
                alt={movie.title}
                className="movie-detail__img"
              />
            )}
          </div>
        )}
    </div>
  );
}

export default MovieDetail;
