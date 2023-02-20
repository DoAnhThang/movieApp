import React, { useState, useContext } from "react";
import "./SearchForm.css";
import MoviesContext from "../../Context/MoviesContext";

function SearchForm() {
  // exchange data with context
  const { setSearchedMovies } = useContext(MoviesContext);

  // set state of input element's value
  const [query, setQuery] = useState("");

  // function fetch API to search movies
  const searchHandler = async (e) => {
    // prevent submit default action of browser
    e.preventDefault();

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=580391f713822f6d4efc83841608050f&language=en-US&query=${query}=1&include_adult=false`
      );
      const data = await res.json();
      console.log(data);

      setSearchedMovies(data.results);
    } catch (error) {
      console.log(`💢 ${error.message} 💢`);
    }
  };

  return (
    // search movies when form is submitted
    <form className="search-form" onSubmit={searchHandler}>
      <div className="search-form__input">
        <input
          type="search"
          name="query"
          placeholder="Enter Title, Actor or Genre of movies"
          value={query}
          // set state of input element's value
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          className="svg-inline--fa fa-search fa-w-16"
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </div>

      <div className="search-form__btn">
        {/* delete currently query */}
        <button
          type="button"
          className="btn-reset"
          // set state of input element's value
          onClick={() => setQuery("")}
        >
          Reset
        </button>

        {/* submit search command when clicked */}
        <button type="submit" className="btn-search">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
