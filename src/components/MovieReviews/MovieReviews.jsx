import { useParams } from "react-router-dom";
import { apiReviews } from "../../api";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setRevies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoding(true);
        const data = await apiReviews(movieId);
        setRevies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoding(false);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <ul>
      {isLoding && <ClipLoader color="rgb(255, 163, 34)" />}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <p>We don't have ane reviews for this movie</p>
      )}
      {error && <p>Oops! Please, try again.</p>}
    </ul>
  );
}
