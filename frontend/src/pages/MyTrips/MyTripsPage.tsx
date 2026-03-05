import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMap } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";
import { getApi } from "../../utils/api";
import { useLoader } from "../../context/LoaderContext";
import TripCard, { type Booking } from "./TripCard";

interface BookingsResponse {
  bookings: Booking[];
}

type Tab = "upcoming" | "past";

const MyTripsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { setIsLoading } = useLoader();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      setIsLoading(true);
      const response = await getApi<BookingsResponse>(
        `/users/${user.id}/bookings`,
      );
      if (response.data) {
        setBookings(response.data.bookings);
      }
      setIsLoading(false);
    };

    fetchBookings();
  }, [user, setIsLoading]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = bookings.filter((b) => new Date(b.end_date) >= today);
  const past = bookings.filter((b) => new Date(b.end_date) < today);
  const displayed = activeTab === "upcoming" ? upcoming : past;

  const emptyMessage =
    activeTab === "upcoming"
      ? {
          heading: "No upcoming trips",
          sub: "Start exploring properties to plan your next stay.",
        }
      : {
          heading: "No past trips",
          sub: "Your completed trips will appear here.",
        };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Trips</h1>

      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        <button
          className={`pb-3 text-sm cursor-pointer ${
            activeTab === "upcoming"
              ? "border-b-2 border-gray-900 font-semibold text-gray-900"
              : "font-medium text-gray-500"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          className={`pb-3 text-sm cursor-pointer ${
            activeTab === "past"
              ? "border-b-2 border-gray-900 font-semibold text-gray-900"
              : "font-medium text-gray-500"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past ({past.length})
        </button>
      </div>

      {displayed.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-center">
          <FiMap className="w-12 h-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {emptyMessage.heading}
          </h2>
          <p className="text-gray-500 mb-6">{emptyMessage.sub}</p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg cursor-pointer"
          >
            Explore properties
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {displayed.map((booking) => (
            <TripCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTripsPage;
