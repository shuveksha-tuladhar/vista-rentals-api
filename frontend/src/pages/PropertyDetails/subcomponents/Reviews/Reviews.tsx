import React from "react";
import { FaStar } from "react-icons/fa6";

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
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="border-b border-gray-300 pb-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map(({ id, author, content, rating }) => (
          <div key={id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-semibold mr-2">{rating.toFixed(1)}</span>
              <span className="text-gray-600">by {author}</span>
            </div>
            <p className="text-gray-700">{content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
