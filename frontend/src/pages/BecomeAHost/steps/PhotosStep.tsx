import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";

interface PhotosStepProps {
  photos: string[];
  onAddPhoto: (photo: string) => void;
  onRemovePhoto: (index: number) => void;
}

const PhotosStep: React.FC<PhotosStepProps> = ({
  photos,
  onAddPhoto,
  onRemovePhoto,
}) => {
  const [photoUrl, setPhotoUrl] = useState("");

  const handleAddUrl = () => {
    if (photoUrl.trim()) {
      onAddPhoto(photoUrl.trim());
      setPhotoUrl("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddUrl();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-2">
        Add some photos of your place
      </h2>
      <p className="text-gray-600 mb-8">
        You'll need at least 5 photo URLs to get started. You can add more later.
      </p>

      <div className="bg-white rounded-xl border-2 border-gray-300 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photo URL
        </label>
        <div className="flex gap-3">
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            placeholder="https://example.com/photo.jpg"
          />
          <button
            onClick={handleAddUrl}
            disabled={!photoUrl.trim()}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
              photoUrl.trim()
                ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaPlus /> Add
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {photos.length}/5 photos added {photos.length < 5 && `(${5 - photos.length} more needed)`}
        </p>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={photo}
                alt={`Property ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => onRemovePhoto(index)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosStep;
