const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
// app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

const authRoutes = require("./middleware/auth");
const movieRoutes = require("./routes/movie");

// authenticate user then next
app.use("/api/movies", authRoutes);

// fetch movies data
app.use("/api/movies", movieRoutes);

// handling non matching request from the client
app.use((req, res, next) => {
  res.statusMessage = "Route not found";
  res.status(404).json({ message: "Route not found" });
});

// server setup
app.listen(process.env.PORT || 5000, () =>
  console.log("Server on " + process.env.PORT)
);
