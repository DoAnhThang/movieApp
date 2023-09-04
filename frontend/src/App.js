import { BrowserRouter, Routes, Route } from "react-router-dom";

import Browse from "./pages/Browse";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
