import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FoodReviews = () => {
  const { foodId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/review/food/${foodId}`);
      setReviews(res.data?.data || []);
    } catch (err) {
      console.error("Fetch reviews error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [foodId]);

  // ✅ Submit review (public, no token)
  const submitReview = async () => {
    if (!comment || rating < 1 || rating > 5) {
      alert("Please provide a valid rating and comment");
      return;
    }

    try {
      await axios.post("/api/review", {
        foodId,
        rating,
        comment,
      });

      setComment("");
      setRating(5);
      fetchReviews(); // Refresh list after adding review
    } catch (err) {
      console.error("Add review error:", err);
      alert("Failed to add review. Try again.");
    }
  };

  if (loading) return <p className="text-center py-8">Loading reviews...</p>;

  return (
    <div className="max-w-xl mx-auto py-6">
      <h2 className="text-xl font-bold mb-4">Food Reviews</h2>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="border p-3 mb-2 rounded">
            <p className="font-semibold">⭐ {r.rating}</p>
            <p>{r.comment}</p>
          </div>
        ))
      )}

      {/* Add Review */}
      <div className="mt-4">
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 w-full mb-2"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border p-2"
        />

        <button
          onClick={submitReview}
          className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default FoodReviews;
