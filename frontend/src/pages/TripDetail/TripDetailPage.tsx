import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format, parseISO, isPast } from "date-fns";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { getApi, postApi } from "../../utils/api";
import { calculateBookingCosts } from "../../utils/bookings";
import { useLoader } from "../../context/LoaderContext";
import HostAvatar from "../../components/HostAvatar";
import type { TripDetail, ExistingReview } from "./types";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; classes: string }> = {
    complete: {
      label: "Booking Confirmed",
      classes: "bg-green-100 text-green-800",
    },
    pending: {
      label: "Pending Payment",
      classes: "bg-yellow-100 text-yellow-800",
    },
    failed: { label: "Payment Failed", classes: "bg-red-100 text-red-800" },
  };
  const { label, classes } = map[status] ?? {
    label: status,
    classes: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide ${classes}`}
    >
      {label}
    </span>
  );
}

function StarRating({
  rating,
  onRate,
}: {
  rating: number;
  onRate?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate?.(star)}
          onMouseEnter={() => onRate && setHovered(star)}
          onMouseLeave={() => onRate && setHovered(0)}
          className={`text-2xl leading-none ${
            star <= (hovered || rating) ? "text-yellow-400" : "text-gray-300"
          } ${onRate ? "cursor-pointer" : "cursor-default"}`}
          disabled={!onRate}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewForm({
  bookingId,
  propertyId,
  onSubmitted,
}: {
  bookingId: number;
  propertyId: number;
  onSubmitted: (review: ExistingReview) => void;
}) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (!text.trim()) {
      setError("Please write something about your stay.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const { data, error: err } = await postApi<ExistingReview>("/reviews", {
      review: {
        booking_id: bookingId,
        property_id: propertyId,
        rating,
        review: text.trim(),
      },
    });
    setSubmitting(false);
    if (data) {
      onSubmitted(data);
    } else {
      setError(err?.message ?? "Failed to submit review. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StarRating rating={rating} onRate={setRating} />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Write about your stay..."
        className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-800 resize-none outline-none"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white px-6 py-2 text-sm font-medium disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

function ReadOnlyReview({ review }: { review: ExistingReview }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <StarRating rating={review.rating} />
        <span className="text-xs text-gray-400">
          {format(parseISO(review.created_at), "MMM d, yyyy")}
        </span>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{review.review}</p>
    </div>
  );
}

export default function TripDetailPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [submittedReview, setSubmittedReview] = useState<ExistingReview | null>(
    null,
  );
  const { setIsLoading } = useLoader();

  useEffect(() => {
    async function fetchTrip() {
      setIsLoading(true);
      const { data, error } = await getApi<TripDetail>(
        `/bookings/${bookingId}`,
      );
      setIsLoading(false);
      if (data) setTrip(data);
      else {
        console.error(error);
        navigate("/trips");
      }
    }
    fetchTrip();
  }, [bookingId, navigate, setIsLoading]);

  if (!trip) return null;

  const {
    property,
    start_date,
    end_date,
    is_refundable,
    payment_status,
    created_at,
  } = trip;
  const heroImage = property.property_images?.[0]?.url;
  const checkIn = parseISO(start_date);
  const checkOut = parseISO(end_date);
  const isPastTrip = isPast(checkOut) && payment_status === "complete";
  const costs = calculateBookingCosts(
    property.price,
    checkIn,
    checkOut,
    is_refundable,
  );
  const existingReview = submittedReview ?? trip.existing_review;
  const hasReview = trip.has_review || !!submittedReview;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-4">
        <button
          onClick={() => navigate("/trips")}
          className="flex items-center gap-2 text-sm text-gray-500"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to My Trips
        </button>
      </div>

      {heroImage && (
        <div className="w-full h-48 overflow-hidden bg-gray-100">
          <img
            src={heroImage}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <StatusBadge status={payment_status} />
          <h1 className="text-2xl font-semibold text-black mt-3">
            {property.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {property.city}, {property.state}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 p-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Trip Details
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Check-in
                </p>
                <p className="text-sm font-medium text-black mt-1">
                  {format(checkIn, "MMM d, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Check-out
                </p>
                <p className="text-sm font-medium text-black mt-1">
                  {format(checkOut, "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
              <p>
                <span className="text-gray-400">Nights:</span> {costs.nights}
              </p>
              <p>
                <span className="text-gray-400">Booking #:</span> {trip.id}
              </p>
              <p>
                <span className="text-gray-400">Booked on:</span>{" "}
                {format(parseISO(created_at), "MMM d, yyyy")}
              </p>
              <p>
                <span className="text-gray-400">Cancellation:</span>{" "}
                {is_refundable ? "Free cancellation" : "Non-refundable"}
              </p>
            </div>
          </div>

          <div className="border border-gray-200 p-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Price Details
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>
                  ${costs.nightlyPrice.toFixed(2)} × {costs.nights} night
                  {costs.nights !== 1 ? "s" : ""}
                </span>
                <span>${costs.baseTotal.toFixed(2)}</span>
              </div>
              {costs.cleaningFee > 0 && (
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>${costs.cleaningFee.toFixed(2)}</span>
                </div>
              )}
              {costs.serviceFee > 0 && (
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>${costs.serviceFee.toFixed(2)}</span>
                </div>
              )}
              {!is_refundable && costs.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>−${costs.discount.toFixed(2)}</span>
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-sm font-semibold text-black">
              <span>Total USD</span>
              <span>${costs.totalBeforeTaxes.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {property.user && (
          <div className="border border-gray-200 p-6 mb-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
              Hosted by
            </p>
            <div className="flex items-center gap-4">
              <HostAvatar
                firstName={property.user.first_name}
                lastName={property.user.last_name}
                avatarUrl={property.user.avatar_url}
                size="sm"
              />
              <div>
                <p className="text-sm font-medium text-black">
                  {property.user.first_name} {property.user.last_name}
                </p>
                {property.user.host?.bio && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {property.user.host.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {isPastTrip && (
          <div className="border border-gray-200 p-6 mb-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
              {hasReview ? "Your Review" : "Leave a Review"}
            </p>
            {hasReview && existingReview ? (
              <ReadOnlyReview review={existingReview} />
            ) : (
              <ReviewForm
                bookingId={trip.id}
                propertyId={property.id}
                onSubmitted={(r) => setSubmittedReview(r)}
              />
            )}
          </div>
        )}

        <Link
          to={`/property/${property.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-black border border-gray-300 px-5 py-2"
        >
          View Property <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
