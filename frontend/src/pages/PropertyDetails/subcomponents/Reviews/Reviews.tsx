import React, { useState } from "react";
import StarRating from "./StarRating";

interface Review {
  id: number;
  author: string;
  content: string;
  rating: number;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const [showAll, setShowAll] = useState(false);
  if (!reviews || reviews.length === 0) return null;

  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <section className="border-y border-gray-300 py-6">
      <h2 className="text-xl font-semibold mb-6">Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleReviews.map(({ id, author, content, rating }) => (
          <div key={id}>
            <div className="flex items-center mb-2 text-sm text-gray-800">
              <StarRating rating={rating} />
              <span className="font-semibold mx-2">{rating.toFixed(1)}</span>
              <span className="text-gray-600">by {author}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
          </div>
        ))}
      </div>

      {reviews.length > 6 && !showAll && (
        <div className="mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-100 transition cursor-pointer"
          >
            Show all {reviews.length} reviews
          </button>
        </div>
      )}
    </section>
  );
};

export default Reviews;
