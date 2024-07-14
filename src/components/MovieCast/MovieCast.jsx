import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from '../../../movies-api';
import css from '../MovieCast/MovieCast.module.css';

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        const data = await fetchCast(movieId);
        setCast(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovieCast();
  }, [movieId]);

  const posterUrl =
    'https://dummyimage.com/400x600/dbd2db/fff.jpg&text=No+poster';

  return (
    <div>
      <ul className={css.list}>
        {cast &&
          cast.map(item => (
            <li key={item.id}>
              <img
                className={css.img}
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                    : posterUrl
                }
                alt={item.name}
              />
              <p className={css.listText}>
                {item.name} as {item.character}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
