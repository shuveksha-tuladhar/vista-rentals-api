import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HostNavbar from "./components/HostNavbar";
import Stepper from "./components/Stepper";
import PropertyTypeStep from "./steps/PropertyTypeStep";
import LocationStep from "./steps/LocationStep";
import BasicsStep from "./steps/BasicsStep";
import AmenitiesStep from "./steps/AmenitiesStep";
import PhotosStep from "./steps/PhotosStep";
import DescriptionStep from "./steps/DescriptionStep";
import PricingStep from "./steps/PricingStep";
import { useToastStore } from "../../store/toastStore";

interface ListingData {
  propertyType: string;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  };
  basics: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  amenities: string[];
  photos: string[];
  description: {
    title: string;
    description: string;
  };
  price: number;
}

const steps = [
  { id: 1, title: "Property Type" },
  { id: 2, title: "Location" },
  { id: 3, title: "Basics" },
  { id: 4, title: "Amenities" },
  { id: 5, title: "Photos" },
  { id: 6, title: "Description" },
  { id: 7, title: "Pricing" },
];

const BecomeAHost: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [listingData, setListingData] = useState<ListingData>({
    propertyType: "",
    location: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
    basics: {
      guests: 1,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
    },
    amenities: [],
    photos: [],
    description: {
      title: "",
      description: "",
    },
    price: 0,
  });

  const handlePropertyTypeSelect = (type: string) => {
    setListingData({ ...listingData, propertyType: type });
  };

  const handleLocationChange = (field: string, value: string) => {
    setListingData({
      ...listingData,
      location: { ...listingData.location, [field]: value },
    });
  };

  const handleBasicsChange = (field: string, value: number) => {
    setListingData({
      ...listingData,
      basics: { ...listingData.basics, [field]: value },
    });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = listingData.amenities.includes(amenity)
      ? listingData.amenities.filter((a) => a !== amenity)
      : [...listingData.amenities, amenity];
    setListingData({ ...listingData, amenities: newAmenities });
  };

  const handleAddPhoto = (photo: string) => {
    setListingData({ ...listingData, photos: [...listingData.photos, photo] });
  };

  const handleRemovePhoto = (index: number) => {
    setListingData({
      ...listingData,
      photos: listingData.photos.filter((_, i) => i !== index),
    });
  };

  const handleDescriptionChange = (field: string, value: string) => {
    setListingData({
      ...listingData,
      description: { ...listingData.description, [field]: value },
    });
  };

  const handlePriceChange = (price: number) => {
    setListingData({ ...listingData, price });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return listingData.propertyType !== "";
      case 1:
        return (
          listingData.location.street !== "" &&
          listingData.location.city !== "" &&
          listingData.location.state !== "" &&
          listingData.location.country !== "" &&
          listingData.location.zipcode !== ""
        );
      case 2:
        return true; // Basics always valid with default values
      case 3:
        return listingData.amenities.length > 0;
      case 4:
        return listingData.photos.length >= 5;
      case 5:
        return (
          listingData.description.title !== "" &&
          listingData.description.description !== ""
        );
      case 6:
        return listingData.price > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      addToast({
        message: "Please complete all required fields",
        type: "error",
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    if (!validateStep(currentStep)) {
      addToast({
        message: "Please complete all required fields",
        type: "error",
      });
      return;
    }

    // TODO: Send data to API
    console.log("Listing Data:", listingData);
    addToast({
      message: "Your listing has been created successfully!",
      type: "success",
    });
    navigate("/");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PropertyTypeStep
            selectedType={listingData.propertyType}
            onSelectType={handlePropertyTypeSelect}
          />
        );
      case 1:
        return (
          <LocationStep
            formData={listingData.location}
            onFormChange={handleLocationChange}
          />
        );
      case 2:
        return (
          <BasicsStep
            formData={listingData.basics}
            onFormChange={handleBasicsChange}
          />
        );
      case 3:
        return (
          <AmenitiesStep
            selectedAmenities={listingData.amenities}
            onToggleAmenity={handleAmenityToggle}
          />
        );
      case 4:
        return (
          <PhotosStep
            photos={listingData.photos}
            onAddPhoto={handleAddPhoto}
            onRemovePhoto={handleRemovePhoto}
          />
        );
      case 5:
        return (
          <DescriptionStep
            formData={listingData.description}
            onFormChange={handleDescriptionChange}
          />
        );
      case 6:
        return (
          <PricingStep price={listingData.price} onPriceChange={handlePriceChange} />
        );
      default:
        return null;
    }
  };

  const getValidationMessage = () => {
    switch (currentStep) {
      case 0:
        return listingData.propertyType === "" ? "Please select a property type" : "";
      case 1:
        return !validateStep(1) ? "Please fill in all location fields" : "";
      case 3:
        return listingData.amenities.length === 0 ? "Please select at least one amenity" : "";
      case 4:
        return listingData.photos.length < 5 ? `Add ${5 - listingData.photos.length} more photo(s)` : "";
      case 5:
        return !validateStep(5) ? "Please add a title and description" : "";
      case 6:
        return listingData.price === 0 ? "Please set a price" : "";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HostNavbar />
      
      <div className="flex-1">
        <Stepper steps={steps} currentStep={currentStep} />
        
        <div className="pb-24">
          {renderStep()}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all ${
                currentStep === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-900 underline hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Back
            </button>

            <div className="flex items-center space-x-4">
              {getValidationMessage() && (
                <span className="text-sm text-red-500 hidden md:block">
                  {getValidationMessage()}
                </span>
              )}
              
              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-md cursor-pointer"
                >
                  Publish Listing
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeAHost;
