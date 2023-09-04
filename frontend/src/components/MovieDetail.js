import React, { useCallback, useEffect, useState } from "react";
import { requests, IMAGE_URL, SERVER_URL } from "../utils/movies-link.js";
import YouTube from "react-youtube";

// format size of YouTube component
const opts = {
  height: "450",
  width: "100%",
  playerVars: {
    autoplay: 0,
    origin: "https://www.youtube.com/",
  },
};

function MovieDetail({ movieData }) {
  // set state of video will be showed
  const [trailer, setTrailer] = useState([]);

  // fetch the trailer of the movie that was clicked on
  const fetchTrailer = useCallback(async () => {
    const res = await fetch(`${SERVER_URL}${requests.fetchTrailer}`, {
      method: "POST",
      body: JSON.stringify({ film_id: movieData.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resVideo = await res.json();
    // const resVideos = data.results;
    // console.log("resVideo: ", resVideo);
    setTrailer(resVideo);

    // filter YouTube videos
    // if (resVideos) {
    //   let filteredVideo = [];
    //   filteredVideo = resVideos.filter(
    //     (video) => video.site === "YouTube" && video.type === "Trailer"
    //   );
    //   if (filteredVideo === []) {
    //     filteredVideo = resVideos.filter(
    //       (video) => video.site === "YouTube" && video.type === "Teaser"
    //     );
    //   }

    //   setTrailer(filteredVideo);
    // }
  }, [movieData]);

  // fetch trailer
  useEffect(() => {
    fetchTrailer().catch((error) => {
      console.log(`💢 ${error.message} 💢`);
    });
  }, [fetchTrailer]);

  return (
    <div
      className="row mx-0 justify-content-between position-absolute start-0 text-white bg-dark bg-gradient mt-2 movie-detail"
      style={{ zIndex: 10, padding: "1rem 3rem" }}
    >
      <div className="col-12 col-md-4 col-xl-6">
        <h3 className="border-bottom border-2 pb-4">
          {movieData.title || movieData.name}
        </h3>
        <h6>
          Release Date: {movieData.release_date || movieData.first_air_date}
        </h6>
        <h6 className="mb-3">Vote: {movieData.vote_average} / 10</h6>
        <p className="lh-base" style={{ fontSize: "0.85rem" }}>
          {movieData.overview || "Have no overview available currently!"}
        </p>
      </div>

      {/* show movie's video or backdrop image */}
      {trailer.key ? (
        <YouTube
          videoId={trailer.key}
          opts={opts}
          className="col-12 col-md-8 col-xl-6"
        />
      ) : (
        <img
          src={`${IMAGE_URL}${
            movieData.backdrop_path || movieData.poster_path
          }`}
          alt={movieData.title}
          className="col-12 col-md-8 col-xl-6"
        />
      )}
    </div>
  );
}

export default MovieDetail;
