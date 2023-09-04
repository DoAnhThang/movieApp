const express = require("express");
const router = express.Router();

const Movies = require("../models/Movies");

router.use((req, res, next) => {
  const requestToken = req.query.token;

  // return error when have no token param
  if (!requestToken) {
    res.statusMessage = "Unauthorized";
    res.status(401).json({ statusCode: 401, message: "Unauthorized" });
  } else {
    // check user token
    Movies.fetchUserToken((users) => {
      const user = users.find((user) => user.token === requestToken);
      if (user) {
        next();
      } else {
        res.statusMessage = "Unauthorized";
        res.status(401).json({ statusCode: 401, message: "Unauthorized" });
      }
    });
  }
});

module.exports = router;
