const express = require("express");

const movieController = require("../controllers/movie");

const router = express.Router();

router.get("/trending", movieController.getTrendingMovies);

router.get("/top-rate", movieController.getToprateMovies);

router.get("/discover", movieController.getGenreMovies);

router.post("/video", movieController.getTrailer);

router.post("/search", movieController.getSearchedMovies);

module.exports = router;
