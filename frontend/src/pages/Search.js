import { useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";

function Search() {
  // set state of searched movies
  const [keyword, setKeyword] = useState("");
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <>
      <SearchForm
        setSearchedMovies={(movies) => setSearchedMovies(movies)}
        setSelectedMovie={(movie) => setSelectedMovie(movie)}
        setKeyword={(keyword) => setKeyword(keyword)}
      />
      <SearchResult
        searchedMovies={searchedMovies}
        selectedMovie={selectedMovie}
        setSelectedMovie={(movie) => setSelectedMovie(movie)}
        keyword={keyword}
      />
    </>
  );
}

export default Search;
