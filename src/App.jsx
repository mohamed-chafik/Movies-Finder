import { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  
  // Fetching data from the API
  const searchMovies = async (name) => {
    const response = await fetch(`https://www.omdbapi.com?apikey=9e9808e5&s=${name}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  return (
    <>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies"
      />

      <button onClick={() => searchMovies(searchTerm)}>
        Search
      </button>

      {movies?.length > 0 && (
        <div className="container">
          {movies.map((movie) => (
            <MoviesCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}

// Placeholder component for MoviesCard
function MoviesCard({ movie }) {
  return (
    <div className="movie-card">
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={movie.Title} />
    </div>
  );
}

export default App;
