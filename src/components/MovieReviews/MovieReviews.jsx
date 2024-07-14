import { useEffect, useState } from 'react';
import { fetchReviews } from '../../../movies-api';
import { useParams } from 'react-router-dom';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovieReviews();
  }, [movieId]);
  // console.log(reviews);
  return (
    <div>
      {reviews.length > 0 ? (
        <ul>
          {reviews &&
            reviews.map(({ id, author, content }) => (
              <li key={id}>
                <h3>{author}</h3>
                <p>{content}</p>
              </li>
            ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </div>
  );
}
