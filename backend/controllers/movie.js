const Movies = require("../models/Movies");
const pagingMovieList = require("../utils/paging");

// get Trending movies
exports.getTrendingMovies = (req, res, next) => {
  const requestPage = parseInt(req.query.page) || 1;
  Movies.fetchMovieList((movies) => {
    movies.sort((a, b) => b.popularity - a.popularity);
    const response = pagingMovieList(movies, requestPage, null);
    res.status(200).json(response);
  });
};

// get Top rate movies
exports.getToprateMovies = (req, res, next) => {
  const requestPage = parseInt(req.query.page) || 1;
  Movies.fetchMovieList((movies) => {
    movies.sort((a, b) => b.vote_average - a.vote_average);
    const response = pagingMovieList(movies, requestPage, null);
    res.status(200).json(response);
  });
};

// get movies by genre
exports.getGenreMovies = (req, res, next) => {
  const requestGenre = parseInt(req.query.genre);
  const requestPage = parseInt(req.query.page) || 1;

  // return error when have no genre param
  if (!requestGenre) {
    res.statusMessage = "Not found genre param";
    res.status(400).json({ statusCode: 400, message: "Not found genre param" });
  } else {
    Movies.fetchGenreList((genres) => {
      const genre = genres.find((genre) => genre.id === requestGenre);

      // return error when not found genre param
      if (!genre) {
        res.statusMessage = "Not found that genre id";
        res
          .status(400)
          .json({ statusCode: 400, message: "Not found that genre id" });
      } else {
        // filter movies by genre param
        Movies.fetchMovieList((movies) => {
          const moviesByGenre = movies.filter((movie) => {
            const genreIndex = movie.genre_ids.findIndex(
              (id) => id === requestGenre
            );
            return movie.genre_ids[genreIndex] === requestGenre;
          });
          moviesByGenre.sort((a, b) => b.popularity - a.popularity);
          const response = pagingMovieList(
            moviesByGenre,
            requestPage,
            genre.name
          );
          res.status(200).json(response);
        });
      }
    });
  }
};

// get trailer of a movie
exports.getTrailer = (req, res, next) => {
  const requestId = parseInt(req.body.film_id);

  // return error when have no film_id param
  if (!requestId) {
    res.statusMessage = "Not found film_id param";
    res
      .status(400)
      .json({ statusCode: 400, message: "Not found film_id param" });
  } else {
    Movies.fetchVideoList((videos) => {
      const videosArray = videos.find((video) => video.id === requestId);

      // return error when not found film_id param
      if (!videosArray) {
        res.statusMessage = "Not found video";
        res.status(404).json({ statusCode: 404, message: "Not found video" });
      } else {
        // filter Trailer videos
        const resTrailers = videosArray.videos.filter(
          (video) =>
            video.official === true &&
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        if (resTrailers.length !== 0) {
          resTrailers.sort((a, b) => b.published_at - a.published_at);
          res.status(200).json(resTrailers[0]);
        } else if (resTrailers.length === 0) {
          // filter Teaser videos
          const resTeasers = videosArray.videos.filter(
            (video) =>
              video.official === true &&
              video.site === "YouTube" &&
              video.type === "Teaser"
          );

          if (resTeasers.length !== 0) {
            resTeasers.sort((a, b) => b.published_at - a.published_at);
            res.status(200).json(resTeasers[0]);
          } else if (resTeasers.length === 0) {
            res.statusMessage = "Not found video";
            res
              .status(404)
              .json({ statusCode: 404, message: "Not found video" });
          }
        }
      }
    });
  }
};

// get searched movies by keyword
exports.getSearchedMovies = (req, res, next) => {
  const keyword = req.body.keyword;
  const requestGenre = parseInt(req.body.genre);
  const requestMediaType = req.body.mediaType;
  const requestLanguage = req.body.language;
  const requestYear = req.body.year;
  // console.log(
  //   keyword,
  //   requestGenre,
  //   requestMediaType,
  //   requestLanguage,
  //   requestYear
  // );
  const requestPage = parseInt(req.query.page) || 1;

  // return error when have no keyword param
  if (!keyword) {
    res.statusMessage = "Not found keyword param";
    res
      .status(400)
      .json({ statusCode: 400, message: "Not found keyword param" });
  } else {
    Movies.fetchMovieList((movies) => {
      // filter by the keyword
      let searchedMovies = movies.filter((movie) => {
        if (movie.title && movie.title.toLowerCase().includes(keyword))
          return true;
        if (movie.name && movie.name.toLowerCase().includes(keyword))
          return true;
        if (movie.overview && movie.overview.toLowerCase().includes(keyword))
          return true;
        return false;
      });
      // console.log("searchedMovies by keyword: ", searchedMovies.length);

      // filter by the genre
      if (requestGenre) {
        searchedMovies = searchedMovies.filter((movie) => {
          const genreIndex = movie.genre_ids.findIndex(
            (id) => id === requestGenre
          );
          return movie.genre_ids[genreIndex] === requestGenre;
        });
      }
      // console.log("searchedMovies by genre: ", searchedMovies.length);

      // filter by the media type
      if (requestMediaType !== "Select Media Type") {
        searchedMovies = searchedMovies.filter(
          (movie) => movie.media_type === requestMediaType
        );
      }
      // console.log("searchedMovies by media type: ", searchedMovies.length);

      // filter by the language
      if (requestLanguage !== "Select Language") {
        searchedMovies = searchedMovies.filter(
          (movie) => movie.original_language === requestLanguage
        );
      }
      // console.log("searchedMovies by language: ", searchedMovies.length);

      // filter by the release year
      if (requestYear) {
        searchedMovies = searchedMovies.filter((movie) => {
          if (movie.release_date)
            return movie.release_date.slice(0, 4) === requestYear;
          if (movie.first_air_date)
            return movie.first_air_date.slice(0, 4) === requestYear;
        });
      }
      // console.log("searchedMovies by year: ", searchedMovies.length);

      const response = pagingMovieList(searchedMovies, requestPage, null);
      res.status(200).json(response);
    });
  }
};
