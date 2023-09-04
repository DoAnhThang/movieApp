import { useState } from "react";
import { requests, SERVER_URL } from "../utils/movies-link";

// import data from .json file
import genreList from "../utils/genreList";
import mediaTypeList from "../utils/mediaTypeList";

function SearchForm({ setSearchedMovies, setSelectedMovie, setKeyword }) {
  // set state of input element's value
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("Select Genre");
  const [mediaType, setMediaType] = useState("Select Media Type");
  const [language, setLanguage] = useState("Select Language");
  const [year, setYear] = useState("");

  // function fetch API to search movies
  const searchHandler = async (e) => {
    // prevent submit default action of browser
    e.preventDefault();
    setKeyword(query);

    try {
      const res = await fetch(`${SERVER_URL}${requests.fetchSearch}`, {
        method: "POST",
        body: JSON.stringify({
          keyword: query.toLowerCase(),
          genre: genre,
          mediaType: mediaType,
          language: language,
          year: year,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);

      setSearchedMovies(data.results);
    } catch (error) {
      console.log(`💢 ${error.message} 💢`);
    }
  };

  return (
    <div className="container-fluid">
      <form
        onSubmit={searchHandler}
        className="container d-flex flex-column bg-white rounded-top mx-auto mb-5 pt-2"
        style={{ marginTop: "5rem", maxWidth: "768px" }}
      >
        <div className="d-flex justify-content-between pb-4">
          <input
            type="search"
            name="query"
            placeholder="Enter Movie's Title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-100 border-0 outline-0 py-2 px-3"
          />
          <svg
            className="svg-inline--fa fa-search fa-w-16 mx-3"
            fill="#ccc"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ width: "1.75rem" }}
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </div>

        {/* Adding advance search */}
        <div className="row gy-3 border-top border-bottom border-3 border-info pb-3">
          <div className="col-12 col-sm-6 d-flex justify-content-between align-items-center gap-3">
            <label htmlFor="genre" className="form-label">
              Genre
            </label>
            <select
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="form-control"
              style={{ maxWidth: "16rem" }}
            >
              <option defaultValue>Select Genre</option>
              {genreList.map((genre) => (
                <option value={genre.id} key={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-sm-6 d-flex justify-content-between align-items-center gap-3">
            <label htmlFor="media-type" className="form-label text-nowrap">
              Media Type
            </label>
            <select
              name="media-type"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              className="form-control"
              style={{ maxWidth: "16rem" }}
            >
              <option defaultValue>Select Media Type</option>
              {mediaTypeList.map((media) => (
                <option value={media} key={media}>
                  {media.replace(/./, (str) => str.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-sm-6 d-flex justify-content-between align-items-center gap-3">
            <label htmlFor="language" className="form-label">
              Language
            </label>
            <select
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-control"
              style={{ maxWidth: "16rem" }}
            >
              <option defaultValue>Select Language</option>
              <option value={"en"}>English / American</option>
              <option value={"jp"}>Japanese</option>
              <option value={"kr"}>Korean</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 d-flex justify-content-between align-items-center gap-3">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-control"
              style={{ maxWidth: "16rem" }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3 my-3 mx-4">
          {/* delete current queries */}
          <button
            type="button"
            className="btn btn-light fw-bold py-2 px-3"
            onClick={() => {
              setQuery("");
              setGenre("Select Genre");
              setMediaType("Select Media Type");
              setLanguage("Select Language");
              setYear("");
              setSearchedMovies(null);
              setSelectedMovie(null);
            }}
          >
            RESET
          </button>

          {/* submit search command when clicked */}
          <button
            type="submit"
            className="btn btn-info fw-bold py-2 px-3 text-light"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
