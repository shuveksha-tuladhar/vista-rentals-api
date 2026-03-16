import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import StarRating from "./StarRating";
import { capitalize } from "../../../../utils/capitalize";
import type { Review } from "./types/ReviewType";

type AiSummaryStatus = "idle" | "loading" | "available" | "failed";

interface ReviewsProps {
  reviews: Review[];
  aiSummary?: string | null;
  aiSummaryStatus?: AiSummaryStatus;
}

const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  aiSummary,
  aiSummaryStatus = "idle",
}) => {
  const [showAll, setShowAll] = useState(false);
  if (!reviews || reviews.length === 0) return null;

  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <section className="border-y border-gray-300 py-6">
      <h2 className="text-xl font-semibold mb-6">Reviews</h2>

      {aiSummaryStatus === "loading" && (
        <div className="border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-1.5 mb-4">
            <BsStars className="text-amber-500 text-sm" />
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              AI-generated summary
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Generating summary...</p>
          </div>
        </div>
      )}

      {aiSummaryStatus === "available" && aiSummary && aiSummary.trim().length > 0 && (
        <div className="border border-gray-200 p-5 mb-6">
          <div className="flex items-center gap-1.5 mb-4">
            <BsStars className="text-amber-500 text-sm" />
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              AI-generated summary
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-5xl leading-none text-amber-500 select-none mt-1">&ldquo;</span>
            <p className="text-gray-700 text-base leading-relaxed">{aiSummary}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleReviews.map(({ id, user, review: content, rating }) => (
          <div key={id}>
            <div className="flex items-center mb-2 text-sm text-gray-800">
              <StarRating rating={rating} />
              <span className="font-semibold mx-2">{rating.toFixed(1)}</span>
              <span className="text-gray-600">{`by ${capitalize(
                user.first_name
              )} ${capitalize(user.last_name)}`}</span>
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
