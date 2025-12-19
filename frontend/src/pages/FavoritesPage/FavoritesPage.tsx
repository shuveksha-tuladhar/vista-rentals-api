import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../../store/favoritesStore";
import { getApi } from "../../utils/api";
import { useLoader } from "../../context/LoaderContext";
import type { Properties } from "../LandingPage/types/Properties";
import PropertyCard from "../LandingPage/PropertyCard";

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favoriteIds } = useFavoritesStore();
  const { setIsLoading } = useLoader();
  const [properties, setProperties] = React.useState<Properties[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFavoriteProperties = async () => {
      if (favoriteIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setLoading(true);
        const response = await getApi<Properties[]>("/properties");
        if (response.data) {
          // Filter properties that are in favorites
          const favoriteProperties = response.data.filter((property) =>
            favoriteIds.includes(property.id)
          );
          setProperties(favoriteProperties);
        }
      } catch (error) {
        console.error("Error fetching favorite properties:", error);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    fetchFavoriteProperties();
  }, [favoriteIds, setIsLoading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Favorites</h1>
          <p className="text-gray-600 text-lg">
            {properties.length === 0
              ? "No favorite properties yet"
              : `You have ${properties.length} favorite ${
                  properties.length === 1 ? "property" : "properties"
                }`}
          </p>
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((property) => (
              <div
                key={property.id}
                onClick={() => navigate(`/property/${property.id}`)}
                className="cursor-pointer transition-opacity hover:opacity-80"
              >
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start adding properties to your favorites by clicking the heart icon
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Explore Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
