import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/reviews/");
        console.log("API Response:", res.data);
        setReviews(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.place_name}</strong>: {review.comment} ({review.rating} ⭐)
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default ReviewList;
