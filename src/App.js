import { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import "./App.css";
import MovieCard from "./MovieCard";

const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=1204885e`;
// const movie_list = {
//   Title: "Superman, Spiderman or Batman",
//   Year: "2011",
//   imdbID: "tt2084949",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg",
// };

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies({ search });
  }, [search]);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search For Movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="SearchIcon"
          onClick={() => searchMovies(search)}
          // key={search}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movie Found</h2>
        </div>
      )}
    </div>
  );
}
