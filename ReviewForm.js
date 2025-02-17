import React, { useState, useEffect } from "react";

const ReviewForm = () => {
  const [placeName, setPlaceName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState(null);  // Store only one review
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load review from localStorage on mount
  useEffect(() => {
    const storedReview = localStorage.getItem("review");
    if (storedReview) {
      setReview(JSON.parse(storedReview)); // Parse and set the single review
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!placeName || !comment || !rating) {
      setError("All fields are required.");
      return;
    }

    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    // Create new review object
    const newReview = {
      id: Date.now(), // Unique ID
      place_name: placeName,
      comment,
      rating: parsedRating,
    };

    // Update the review state to only store the latest review
    setReview(newReview);
    localStorage.setItem("review", JSON.stringify(newReview)); // Save to localStorage
    setSuccess("Review submitted successfully!");

    // Reset form fields
    setPlaceName("");
    setComment("");
    setRating("");
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Place Name:</label>
          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>

      <h2>Reviews</h2>
      {review ? (
        <ul>
          <li key={review.id}>
            <strong>{review.place_name}</strong>: {review.comment} ({review.rating} ⭐)
          </li>
        </ul>
      ) : (
        <p>No review available.</p>
      )}
    </div>
  );
};

export default ReviewForm;
