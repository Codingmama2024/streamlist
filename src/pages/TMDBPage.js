import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TMDBPage = () => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Use environment variable

      if (!apiKey) {
        setErrorMessage("Missing TMDB API key. Please set REACT_APP_TMDB_API_KEY in your .env file.");
        return;
      }

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=8f3ccb7fb9e09c34e08ed6b7862804ee`
        );
        setMovies(response.data.results);
      } catch (error) {
        setErrorMessage("Failed to fetch movies from TMDB API.");
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Trending Movies This Week</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {movies.map((movie) => (
          <li key={movie.id} style={{ marginBottom: '15px' }}>
            <strong>{movie.title}</strong>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TMDBPage;
