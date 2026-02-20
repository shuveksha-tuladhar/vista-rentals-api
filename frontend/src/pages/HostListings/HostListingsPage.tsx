import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HostNavbar from "../../components/HostNavbar";
import { getApi } from "../../utils/api";
import type { HostListing } from "./types";
import HostListingCard from "./components/HostListingCard";

interface HostListingsResponse {
  data: HostListing[];
  error: string | null;
}

const HostListingsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<HostListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const response = await getApi<HostListingsResponse>("/host/listings");
      if (response.error) {
        setError("Failed to load your listings. Please try again.");
      } else if (response.data) {
        setListings(response.data.data ?? []);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/host/listings/${id}/edit`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HostNavbar />

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Listings</h1>
          <button
            onClick={() => navigate("/become-a-host")}
            className="px-5 py-2 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-900"
          >
            Add another property
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <p className="text-gray-500">Loading your listings...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-center justify-center py-24">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && listings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-gray-500 text-lg">You have no listings yet.</p>
            <button
              onClick={() => navigate("/become-a-host")}
              className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900"
            >
              Create your first listing
            </button>
          </div>
        )}

        {!loading && !error && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <HostListingCard
                key={listing.id}
                listing={listing}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostListingsPage;
