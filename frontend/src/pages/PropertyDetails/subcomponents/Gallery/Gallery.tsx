import React from "react";
import type { PropertyImages } from "./types/PropertyImagesType";

interface GalleryProps {
  images: PropertyImages[];
  onShowAllPhotos?: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onShowAllPhotos }) => {
  if (!images || images.length === 0) {
    return null;
  }

  const hasMultipleImages = images.length >= 2;
  const hasFourThumbnails = images.length >= 5;

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl cursor-pointer
        ${hasMultipleImages ? "grid" : ""}
        ${hasMultipleImages ? "grid-cols-1 sm:grid-cols-2" : ""} 
        ${hasMultipleImages ? "gap-2" : ""} 
        h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px]`}
      onClick={onShowAllPhotos}
    >
      <img
        src={images[0].url}
        alt="Property main view"
        className={`
          w-full h-full object-cover rounded-xl
          ${hasMultipleImages ? "sm:row-span-2" : ""} 
          ${
            hasMultipleImages ? "sm:rounded-tr-none sm:rounded-br-none" : ""
          }         `}
      />

      {hasMultipleImages && (
        <div className="hidden sm:grid grid-cols-2 gap-2">
          {" "}
          {images.slice(1, hasFourThumbnails ? 5 : 2).map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.url}
                alt={`Property thumbnail ${index + 1}`}
                className={`
                  w-full h-[194px] lg:h-[244px] xl:h-[294px] object-cover rounded-xl
                  ${
                    index === 1 &&
                    "sm:rounded-tl-none sm:rounded-bl-none sm:rounded-br-none"
                  } /* Adjust corner for top-right */
                  ${
                    index === 3 &&
                    "sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-none"
                  } /* Adjust corner for bottom-right */
                `}
              />
              {/* Optional overlay for "Show all photos" on the last thumbnail */}
              {onShowAllPhotos && hasFourThumbnails && index === 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-base font-semibold rounded-xl">
                  Show all photos
                </div>
              )}
            </div>
          ))}
          {/* Conditional rendering for the 3rd and 4th thumbnails if they exist */}
          {!hasFourThumbnails && images.length === 2 && (
            // This section is if you only have 2 images and want the second one to span the entire right column
            <img
              src={images[1].url}
              alt={`Property thumbnail 1`}
              className="w-full h-[194px] lg:h-[244px] xl:h-[294px] object-cover rounded-xl col-span-2" // Make it span two columns if only one thumbnail
            />
          )}
        </div>
      )}

      {/* Overlay for "Show all photos" if there are many images and no specific thumbnail overlay */}
      {onShowAllPhotos && !hasFourThumbnails && hasMultipleImages && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white text-lg font-semibold sm:hidden">
          Show all photos
        </div>
      )}
    </div>
  );
};

export default Gallery;
