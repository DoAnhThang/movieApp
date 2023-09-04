const token = "8qlOkxz4wq";

export const SERVER_URL = "https://njs-asm01-fx19838.glitch.me";

// export const SERVER_URL = "http://localhost:5000";

export const IMAGE_URL = "https://image.tmdb.org/t/p/original";

export const requests = {
  fetchTrending: `/api/movies/trending?token=${token}`,
  fetchTopRated: `/api/movies/top-rate?token=${token}`,
  fetchActionMovies: `/api/movies/discover?token=${token}&genre=28`,
  fetchComedyMovies: `/api/movies/discover?token=${token}&genre=35`,
  fetchHorrorMovies: `/api/movies/discover?token=${token}&genre=27`,
  fetchRomanceMovies: `/api/movies/discover?token=${token}&genre=10749`,
  fetchDocumentaries: `/api/movies/discover?token=${token}&genre=99`,
  fetchTrailer: `/api/movies/video?token=${token}`,
  fetchSearch: `/api/movies/search?token=${token}`,
};
