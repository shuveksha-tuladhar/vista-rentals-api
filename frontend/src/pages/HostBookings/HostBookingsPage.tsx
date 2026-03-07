import { useEffect, useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { parseISO, format, isSameMonth, isSameYear } from "date-fns";
import HostPortalNavbar from "../../components/HostPortalNavbar";
import { getApi } from "../../utils/api";
import { useLoader } from "../../context/LoaderContext";
import type { HostBooking, HostBookingsResponse } from "./types";
import type { PaginationMeta } from "../HostListings/types";

function formatDateRange(startDate: string, endDate: string): string {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  if (isSameMonth(start, end) && isSameYear(start, end)) {
    return `${format(start, "MMM d")} – ${format(end, "d, yyyy")}`;
  }
  return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-gray-200 px-5 py-4">
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-xl font-semibold text-black mt-1">{value}</p>
    </div>
  );
}

function BookingCard({ booking }: { booking: HostBooking }) {
  return (
    <div className="border border-gray-200 border-l-4 border-l-green-500 flex items-center gap-4 px-4 py-4 hover:bg-gray-50 cursor-pointer">
      {booking.property.image_url ? (
        <img
          src={booking.property.image_url}
          alt={booking.property.name}
          className="w-12 h-12 object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-12 h-12 bg-gray-100 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-black truncate">{booking.property.name}</p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">
          {booking.guest.first_name} {booking.guest.last_name} · {booking.guest.email}
        </p>
      </div>
      <div className="text-right flex-shrink-0 ml-4">
        <p className="text-xs text-gray-500">{formatDateRange(booking.start_date, booking.end_date)} · {booking.total_nights} night{booking.total_nights !== 1 ? "s" : ""}</p>
        <p className="text-sm font-semibold text-black mt-1">${booking.total_price}</p>
      </div>
    </div>
  );
}

interface HostListingItem {
  id: number;
  name: string;
}

interface HostListingsApiResponse {
  data: HostListingItem[];
}

const HostBookingsPage = () => {
  const [bookings, setBookings] = useState<HostBooking[]>([]);
  const [meta, setMeta] = useState<HostBookingsResponse["meta"] | null>(null);
  const [fetching, setFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [propertyId, setPropertyId] = useState("");
  const [startDateFrom, setStartDateFrom] = useState("");
  const [startDateTo, setStartDateTo] = useState("");
  const [propertyOptions, setPropertyOptions] = useState<{ id: number; name: string }[]>([]);
  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await getApi<HostListingsApiResponse>("/host/listings?per_page=100");
      if (response.data?.data) {
        setPropertyOptions(response.data.data.map((p) => ({ id: p.id, name: p.name })));
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setFetching(true);
      const params = new URLSearchParams({ page: String(page) });
      if (propertyId) params.set("property_id", propertyId);
      if (startDateFrom) params.set("start_date_from", startDateFrom);
      if (startDateTo) params.set("start_date_to", startDateTo);

      const response = await getApi<HostBookingsResponse>(`/host/bookings?${params}`);
      if (response.data) {
        setBookings(response.data.bookings);
        setMeta(response.data.meta);
      }
      setIsLoading(false);
      setFetching(false);
    };
    fetchBookings();
  }, [page, propertyId, startDateFrom, startDateTo, setIsLoading]);

  const handlePropertyChange = (value: string) => {
    setPage(1);
    setPropertyId(value);
  };

  const startIndex = meta ? (meta.current_page - 1) * meta.per_page + 1 : 0;
  const endIndex = meta ? Math.min(meta.current_page * meta.per_page, meta.total_count) : 0;

  if (fetching && !meta) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HostPortalNavbar />

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-black mb-6">Bookings</h1>

        {meta && (
          <div className="grid grid-cols-2 gap-3 mb-8">
            <StatCard label="Total Bookings" value={meta.total_count} />
            <StatCard label="Total Revenue" value={`$${parseFloat(meta.total_revenue).toLocaleString()}`} />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select
            value={propertyId}
            onChange={(e) => handlePropertyChange(e.target.value)}
            className="border border-gray-300 px-3 py-1.5 text-sm outline-none"
          >
            <option value="">All Properties</option>
            {propertyOptions.map((p) => (
              <option key={p.id} value={String(p.id)}>{p.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={startDateFrom}
            onChange={(e) => { setPage(1); setStartDateFrom(e.target.value); }}
            className="border border-gray-300 px-3 py-1.5 text-sm outline-none text-gray-700"
          />
          <span className="text-sm text-gray-400">to</span>
          <input
            type="date"
            value={startDateTo}
            onChange={(e) => { setPage(1); setStartDateTo(e.target.value); }}
            className="border border-gray-300 px-3 py-1.5 text-sm outline-none text-gray-700"
          />
          {(startDateFrom || startDateTo || propertyId) && (
            <button
              onClick={() => { setPage(1); setPropertyId(""); setStartDateFrom(""); setStartDateTo(""); }}
              className="text-sm text-gray-400 underline"
            >
              Clear
            </button>
          )}
        </div>

        {!fetching && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <FiClipboard className="w-10 h-10 text-gray-300" />
            <p className="text-gray-900 font-medium">No bookings found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters.</p>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="space-y-2">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}

        {meta && meta.total_pages >= 1 && bookings.length > 0 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-400">
              Showing {startIndex}–{endIndex} of {meta.total_count} bookings
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="border border-gray-300 px-4 py-1.5 text-sm font-medium disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === meta.total_pages}
                className="border border-gray-300 px-4 py-1.5 text-sm font-medium disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostBookingsPage;
