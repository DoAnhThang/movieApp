const movieQtyEachPage = 20;

module.exports = pagingMovieList = (movies, reqPage, reqGenre) => {
  if (!movies) return;

  const resultResponse = {};

  // calculate total pages
  let totalPages = 0;
  if (movies.length % movieQtyEachPage === 0) {
    totalPages = movies.length / movieQtyEachPage;
  } else {
    totalPages =
      (movies.length - (movies.length % movieQtyEachPage)) / movieQtyEachPage +
      1;
  }

  // calculate the results array will be returned
  let startIndex = 0,
    endIndex = 0;
  if (reqPage <= totalPages) {
    startIndex = (reqPage - 1) * movieQtyEachPage;
    endIndex = reqPage * movieQtyEachPage - 1;
  } else {
    startIndex = (totalPages - 1) * movieQtyEachPage;
    endIndex = movies.length - 1;
  }

  // return result
  resultResponse.results = movies.slice(startIndex, endIndex + 1);
  resultResponse.page = reqPage > totalPages ? totalPages : reqPage;
  resultResponse.total_pages = totalPages;
  if (reqGenre) resultResponse.genre_name = reqGenre;
  return resultResponse;
};
