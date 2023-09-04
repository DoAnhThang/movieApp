import { useState } from "react";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import { requests } from "../utils/movies-link";

function Browse() {
  // set state of movies based on id & category
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);

  return (
    <>
      <Banner />
      <MovieList
        category={requests.fetchTrending}
        title=""
        isPoster={true}
        selectedId={selectedId}
        setSelectedId={(id) => setSelectedId(id)}
        selectedTitle={selectedTitle}
        setSelectedTitle={(title) => setSelectedTitle(title)}
      />
      <MovieList
        category={requests.fetchTrending}
        title="Xu hướng"
        isPoster={false}
        selectedId={selectedId}
        setSelectedId={(id) => setSelectedId(id)}
        selectedTitle={selectedTitle}
        setSelectedTitle={(title) => setSelectedTitle(title)}
      />
      <MovieList
        category={requests.fetchTopRated}
        title="Xếp hạng cao"
        isPoster={false}
        selectedId={selectedId}
        setSelectedId={(id) => setSelectedId(id)}
        selectedTitle={selectedTitle}
        setSelectedTitle={(title) => setSelectedTitle(title)}
      />
      <MovieList
        category={requests.fetchActionMovies}
        title="Hành động"
        isPoster={false}
        selectedId={selectedId}
        setSelectedId={(id) => setSelectedId(id)}
        selectedTitle={selectedTitle}
        setSelectedTitle={(title) => setSelectedTitle(title)}
      />
      <MovieList
        category={requests.fetchComedyMovies}
        title="Hài"
        isPoster={false}
        selectedId={selectedId}
        setSelectedId={(id) => setSelectedId(id)}
        selectedTitle={selectedTitle}
        setSelectedTitle={(title) => setSelectedTitle(title)}
      />
      <MovieList
        category={requests.fetchHorrorMovies}
        title="Kinh dị"
        isPoster={false}
        selectedId={selectedId}
        setSelectedId={(id) => setSelectedId(id)}
        selectedTitle={selectedTitle}
        setSelectedTitle={(title) => setSelectedTitle(title)}
      />
      <MovieList
        category={requests.fetchRomanceMovies}
        title="Lãng mạn"
        isPoster={false}
        selectedId={selectedId}
        setSelectedId={(id) => setSelectedId(id)}
        selectedTitle={selectedTitle}
        setSelectedTitle={(title) => setSelectedTitle(title)}
      />
      <MovieList
        category={requests.fetchDocumentaries}
        title="Tài liệu"
        isPoster={false}
        selectedId={selectedId}
        setSelectedId={(id) => setSelectedId(id)}
        selectedTitle={selectedTitle}
        setSelectedTitle={(title) => setSelectedTitle(title)}
      />
    </>
  );
}

export default Browse;
