import { Link, useLocation } from 'react-router-dom';
import css from '../MovieList/MovieList.module.css';

export default function MovieList({ lists }) {
  const location = useLocation();

  return (
    <div>
      <ul className={css.list}>
        {lists.map(list => (
          <li key={list.id}>
            <Link to={`/movies/${list.id}`} state={location} className={css.link}>
              {list.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
