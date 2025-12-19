import React from "react";
import { useFavoritesStore } from "../../store/favoritesStore";
import { useAuthStore } from "../../store/authStore";

interface FavoriteButtonProps {
  propertyId: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  propertyId,
  className = "",
  size = "md",
}) => {
  const { user, isLoggedIn, setIsModalOpen } = useAuthStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(propertyId);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    if (user) {
      toggleFavorite(propertyId, user.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 flex items-center justify-center shadow-md ${className}`}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} transition-colors duration-200`}
        fill={favorite ? "#FF385C" : "none"}
        viewBox="0 0 24 24"
        stroke={favorite ? "#FF385C" : "currentColor"}
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
