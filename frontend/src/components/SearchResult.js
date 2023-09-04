import SearchDetail from "./SearchDetail";

function SearchResult({
  searchedMovies,
  selectedMovie,
  setSelectedMovie,
  keyword,
}) {
  // show detail of the movie based on id
  const clickHandler = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };
  // console.log("searchedMovies: ", searchedMovies);

  return (
    <div className="container-fluid text-white mb-5">
      <h4 className="ms-3">Search Result</h4>

      {/* show the movies have been searched */}
      {searchedMovies ? (
        <div
          className="d-grid gap-3 position-relative search-result"
          style={{ gridTemplateColumns: "repeat(9, 1fr)", margin: "1rem 3rem" }}
        >
          {searchedMovies.map((movie) => (
            <SearchDetail
              key={movie.id}
              movie={movie}
              selectedMovie={selectedMovie}
              setSelectedMovie={(movie) => clickHandler(movie)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No result yet!</p>
      )}

      {/* show notification when have no result with keyword */}
      {searchedMovies !== null &&
        searchedMovies !== undefined &&
        searchedMovies.length === 0 && (
          <p className="text-center mt-4">
            No result with "{keyword}" keyword!
          </p>
        )}
    </div>
  );
}

export default SearchResult;
