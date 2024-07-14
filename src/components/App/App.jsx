import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
// import HomePage from '../../pages/HomePage/HomePage';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
// import MoviesPage from '../../pages/MoviesPage/MoviesPage';
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
// import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
// import MovieCast from '../MovieCast/MovieCast';
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
// import MovieReviews from '../MovieReviews/MovieReviews';
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
// import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<p>Loading ...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
