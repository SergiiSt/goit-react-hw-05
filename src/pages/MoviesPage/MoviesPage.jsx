import { useState, useEffect, useMemo } from 'react';
import { fetchMovieSearch } from '../../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import css from '../MoviesPage/MoviesPage.module.css';

export default function MoviesPage() {
  const [inputValue, setInputValue] = useState('');
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch = searchParams.get('query') ?? '';

  const submitQuerySearch = event => {
    event.preventDefault();
    searchParams.set('query', inputValue);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    async function fetchMoviesPage() {
      try {
        const data = await fetchMovieSearch(querySearch);
        setVisibleMovies(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMoviesPage();
  }, [querySearch]);

  const filterMovies = useMemo(() => {
    return visibleMovies.filter(movie =>
      movie.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, visibleMovies]);
  return (
    <div>
      <>
        <form onSubmit={submitQuerySearch} className={css.form}>
          <input
            className={css.input}
            type="text"
            value={inputValue}
            placeholder='Enter name of the movie'
            onChange={e => {
              setInputValue(e.target.value);
            }}
          />
          <button type="submit" className={css.button}>Search</button>
        </form>
      </>
      {visibleMovies && <MovieList lists={filterMovies} />}
    </div>
  );
}
