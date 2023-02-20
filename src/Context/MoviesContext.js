import React, { useState, createContext } from "react";

// create context
export const MoviesContext = createContext({});

// create context provider function
export const MoviesContextProvider = ({ children }) => {
  const [activatedId, setActivatedId] = useState(null);
  const [activatedCategory, setActivatedCategory] = useState(null);
  const [searchedMovies, setSearchedMovies] = useState([]);

  return (
    <MoviesContext.Provider
      // exchange data with components
      value={{
        activatedId,
        setActivatedId,
        activatedCategory,
        setActivatedCategory,
        searchedMovies,
        setSearchedMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
