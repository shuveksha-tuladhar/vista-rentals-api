import React from "react";
import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-black" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfStroke key={i} className="text-black" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;
