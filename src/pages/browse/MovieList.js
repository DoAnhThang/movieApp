import React from "react";
import { requests } from "../../movies-link.js";
import MovieRow from "./MovieRow";
import { MoviesContextProvider } from "../../Context/MoviesContext";

// set context and pass data to child components
function MovieList() {
  return (
    <MoviesContextProvider>
      <div className="movie-list">
        <MovieRow
          category={requests.fetchNetflixOriginals}
          title={null}
          isPoster={true}
        />
        <MovieRow
          category={requests.fetchTrending}
          title={`Xu hướng`}
          isPoster={false}
        />
        <MovieRow
          category={requests.fetchTopRated}
          title={`Xếp hạng cao`}
          isPoster={false}
        />
        <MovieRow
          category={requests.fetchActionMovies}
          title={`Hành động`}
          isPoster={false}
        />
        <MovieRow
          category={requests.fetchComedyMovies}
          title={`Hài`}
          isPoster={false}
        />
        <MovieRow
          category={requests.fetchHorrorMovies}
          title={`Kinh dị`}
          isPoster={false}
        />
        <MovieRow
          category={requests.fetchRomanceMovies}
          title={`Lãng mạn`}
          isPoster={false}
        />
        <MovieRow
          category={requests.fetchDocumentaries}
          title={`Tài liệu`}
          isPoster={false}
        />
      </div>
    </MoviesContextProvider>
  );
}

export default MovieList;
