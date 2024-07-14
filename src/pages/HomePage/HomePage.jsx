import { useState, useEffect } from 'react';
import { fetchMovies } from '../../../movies-api';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchTrendMovies() {
      try {
        const data = await fetchMovies();
        setMovies(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTrendMovies();
  }, []);

  return (
    <div>
      <MovieList lists={movies} />
    </div>
  );
}
