import { useEffect, useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { parseISO, format, isSameMonth, isSameYear } from "date-fns";
import HostPortalNavbar from "../../components/HostPortalNavbar";
import { getApi } from "../../utils/api";
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

function StatusBadge({ status }: { status: string }) {
  if (status === "complete") {
    return (
      <span className="flex items-center gap-1.5 text-sm text-green-700">
        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
        Confirmed
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="flex items-center gap-1.5 text-sm text-red-700">
        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
        Failed
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-sm text-gray-600">
      <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
      Pending
    </span>
  );
}

const PAYMENT_STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "Complete", value: "complete" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

const HostBookingsPage = () => {
  const [bookings, setBookings] = useState<HostBooking[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [propertyId, setPropertyId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [propertyOptions, setPropertyOptions] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page) });
      if (propertyId) params.set("property_id", propertyId);
      if (paymentStatus) params.set("payment_status", paymentStatus);

      const response = await getApi<HostBookingsResponse>(
        `/host/bookings?${params}`,
      );
      if (response.data) {
        setBookings(response.data.bookings);
        setMeta(response.data.meta);

        if (page === 1 && !propertyId && !paymentStatus) {
          const seen = new Set<number>();
          const options = response.data.bookings
            .map((b) => b.property)
            .filter((p) => {
              if (seen.has(p.id)) return false;
              seen.add(p.id);
              return true;
            });
          setPropertyOptions(options);
        }
      }
      setLoading(false);
    };

    fetchBookings();
  }, [page, propertyId, paymentStatus]);

  const handlePropertyChange = (value: string) => {
    setPage(1);
    setPropertyId(value);
  };

  const handleStatusChange = (value: string) => {
    setPage(1);
    setPaymentStatus(value);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HostPortalNavbar />

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Bookings</h1>

        <div className="flex items-center gap-3 mb-6">
          <select
            value={propertyId}
            onChange={(e) => handlePropertyChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            <option value="">All Properties</option>
            {propertyOptions.map((p) => (
              <option key={p.id} value={String(p.id)}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={paymentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            {PAYMENT_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <p className="text-gray-500 text-sm">Loading...</p>
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <FiClipboard className="w-10 h-10 text-gray-300" />
            <p className="text-gray-900 font-medium">No bookings yet</p>
            <p className="text-gray-500 text-sm">
              Guests who book your properties will appear here.
            </p>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Guest
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Property
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Dates
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Nights
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="bg-white">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.guest.first_name} {booking.guest.last_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.property.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatDateRange(booking.start_date, booking.end_date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.total_nights}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      ${booking.total_price}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={booking.payment_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.total_pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-sm text-gray-600">
              Page {meta.current_page} of {meta.total_pages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === meta.total_pages}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostBookingsPage;
