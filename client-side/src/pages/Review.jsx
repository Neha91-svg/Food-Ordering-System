import React from "react";
import { useParams } from "react-router-dom";

const Review = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold text-ternary">Review Page</h1>
      <p>Reviews for item/restaurant with ID: {id}</p>
    </div>
  );
};

export default Review;
