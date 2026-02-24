import { useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import type { HostListing } from "../types";

interface HostListingCardProps {
  listing: HostListing;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const HostListingCard = ({ listing, onEdit, onDelete }: HostListingCardProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

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
        <div className="mt-4 flex items-center justify-end gap-2">
          {confirmDelete ? (
            <>
              <span className="text-sm text-gray-600 mr-auto">Delete this listing?</span>
              <button
                onClick={() => onDelete(listing.id)}
                className="px-3 py-1.5 text-sm font-semibold bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-3 py-1.5 text-sm font-semibold border border-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(listing.id)}
                className="p-2 rounded-lg border border-gray-200 text-gray-600"
                title="Edit listing"
              >
                <FaPencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="p-2 rounded-lg border border-gray-200 text-red-500"
                title="Delete listing"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostListingCard;
