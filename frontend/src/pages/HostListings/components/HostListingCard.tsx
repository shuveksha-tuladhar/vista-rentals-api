import type { HostListing } from "../types";

interface HostListingCardProps {
  listing: HostListing;
  onEdit: (id: number) => void;
}

const HostListingCard = ({ listing, onEdit }: HostListingCardProps) => {
  const imageUrl =
    listing.property_images[0]?.url ||
    "https://placehold.co/600x400/e5e7eb/6b7280?text=No+Image";

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <img
        src={imageUrl}
        alt={listing.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg truncate">{listing.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {listing.property_type} &middot; {listing.city}, {listing.state}
        </p>
        <p className="text-sm text-gray-700 mt-1">
          ${listing.price} <span className="text-gray-500">/ night</span>
        </p>
        <button
          onClick={() => onEdit(listing.id)}
          className="mt-4 w-full py-2 text-sm font-semibold border border-gray-900 text-gray-900 rounded-lg"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default HostListingCard;
