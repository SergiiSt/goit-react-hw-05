import { useEffect, useState } from 'react';
import { fetchDetails } from '../../../movies-api';
import {
  NavLink,
  Outlet,
  useParams,
  Link,
  useLocation,
} from 'react-router-dom';
import { useRef } from 'react';
import { Suspense } from 'react';
import clsx from 'clsx';
import css from '../MovieDetailsPage/MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [details, setDetails] = useState({});
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive);
  };

  useEffect(() => {
    async function fetchMovieDetailPage() {
      try {
        const data = await fetchDetails(movieId);
        // console.log(data);
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovieDetailPage();
  }, [movieId]);

  //   console.log(details);
  const {
    backdrop_path,
    title,
    overview,
    release_date,
    runtime,
    tagline,
    vote_average,
    genres,
  } = details;
  return (
    <>
      <div>
        <div className={css.linkBtn}>
          <Link className={css.link} to={backLinkRef.current}>
            Go Back
          </Link>
        </div>
        <h1>{title}</h1>
        <img src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt="" />
        <ul className={css.list}>
          <li className={css.listItem}>
            <h2>Overview</h2>
            <p>{overview || 'Overview not available'}</p>
          </li>
          <li className={`${css.listItem} ${css.flex} ${css.margin}`}>
            <h2>Release date</h2>
            <p>{release_date || 'Release date not available'}</p>
          </li>
          <li className={`${css.listItem} ${css.flex}`}>
            <h2>Runtime</h2>
            <p>{runtime ? `${runtime} min` : 'Runtime not available'}</p>
          </li>
          <li className={`${css.listItem} ${css.flex} ${css.tagline}`}>
            <h2>Tagline</h2>
            <p>{tagline || 'Tagline not available'}</p>
          </li>
          <li className={`${css.listItem} ${css.flex}`}>
            <h2>Genres</h2>
            <ul className={css.innerList}>
              {genres &&
                genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
            </ul>
          </li>
          <li className={`${css.listItem} ${css.flex}`}>
            <h2>Average rating</h2>
            <p>
              {Math.round((vote_average * 100) / 10) ||
                'Average rating not available'}
              %
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h2>Other information</h2>
        <div className={css.wrap}>
          <NavLink to={`/movies/${movieId}/cast`} className={buildLinkClass}>
            Cast
          </NavLink>
          <NavLink to={`/movies/${movieId}/reviews`} className={buildLinkClass}>
            Reviews
          </NavLink>
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <div>
          <Outlet />
        </div>
      </Suspense>
    </>
  );
}
