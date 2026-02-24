import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HostNavbar from "../../components/HostNavbar";
import { getApi } from "../../utils/api";
import type { HostListing, PaginationMeta } from "./types";
import HostListingCard from "./components/HostListingCard";

interface HostListingsResponse {
  data: HostListing[];
  meta?: PaginationMeta;
  error: string | null;
}

const HostListingsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<HostListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page) });
      if (search) params.set("search", search);
      const response = await getApi<HostListingsResponse>(`/host/listings?${params}`);
      if (response.error) {
        setError("Failed to load your listings. Please try again.");
      } else if (response.data) {
        setListings(response.data.data ?? []);
        setMeta(response.data.meta ?? null);
      }
      setLoading(false);
    };

    fetchListings();
  }, [page, search]);

  const handleSearchChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      setSearch(value);
    }, 300);
  };

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
            className="px-5 py-2 text-sm font-semibold bg-black text-white rounded-lg"
          >
            Add another property
          </button>
        </div>

        {meta && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by title, city, or state..."
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        )}

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

        {!loading && !error && listings.length === 0 && !meta && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-gray-500 text-lg">You have no listings yet.</p>
            <button
              onClick={() => navigate("/become-a-host")}
              className="px-6 py-3 bg-black text-white font-semibold rounded-lg"
            >
              Create your first listing
            </button>
          </div>
        )}

        {!loading && !error && listings.length === 0 && meta && (
          <div className="flex items-center justify-center py-24">
            <p className="text-gray-500">No listings match your search.</p>
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

        {meta && meta.total_pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {meta.current_page} of {meta.total_pages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === meta.total_pages}
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostListingsPage;
