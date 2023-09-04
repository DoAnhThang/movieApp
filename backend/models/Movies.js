const fs = require("fs");
const path = require("path");

// read movie's data from json files
const getDataFromFile = (cb, fileName) => {
  const p = path.join(
    path.dirname(require.main.filename),
    "data",
    `${fileName}.json`
  );

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

// Movies model
module.exports = class Movies {
  // fetch data from file "movieList.json"
  static fetchMovieList(cb) {
    getDataFromFile(cb, "movieList");
  }

  // fetch data from file "videoList.json"
  static fetchVideoList(cb) {
    getDataFromFile(cb, "videoList");
  }

  // fetch data from file "userToken.json"
  static fetchUserToken(cb) {
    getDataFromFile(cb, "userToken");
  }

  // fetch data from file "genreList.json"
  static fetchGenreList(cb) {
    getDataFromFile(cb, "genreList");
  }

  // fetch data from file "mediaTypeList.json"
  static fetchMediaTypeList(cb) {
    getDataFromFile(cb, "mediaTypeList");
  }
};
