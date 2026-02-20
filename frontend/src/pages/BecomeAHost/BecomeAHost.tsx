import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HostNavbar from "./components/HostNavbar";
import Stepper from "./components/Stepper";
import PropertyTypeStep from "./steps/PropertyTypeStep";
import LocationStep from "./steps/LocationStep";
import BasicsStep from "./steps/BasicsStep";
import BedSetupStep from "./steps/BedSetupStep";
import AmenitiesStep from "./steps/AmenitiesStep";
import PhotosStep from "./steps/PhotosStep";
import DescriptionStep from "./steps/DescriptionStep";
import PricingStep from "./steps/PricingStep";
import { useToastStore } from "../../store/toastStore";
import { postApi } from "../../utils/api";
import type { BedSetupData, BedroomConfig, BedEntry } from "./types";

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
    bathrooms: number;
  };
  amenities: string[];
  photos: string[];
  description: {
    title: string;
    description: string;
  };
  price: number;
  bedSetup: BedSetupData;
}

const steps = [
  { id: 1, title: "Property Type" },
  { id: 2, title: "Location" },
  { id: 3, title: "Basics" },
  { id: 4, title: "Bed Setup" },
  { id: 5, title: "Amenities" },
  { id: 6, title: "Photos" },
  { id: 7, title: "Description" },
  { id: 8, title: "Pricing" },
];

const BecomeAHost: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      bathrooms: 1,
    },
    amenities: [],
    photos: [],
    description: {
      title: "",
      description: "",
    },
    price: 0,
    bedSetup: {
      bedrooms: [{ room: "Bedroom 1", beds: [{ bedType: "" }] }],
    },
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

  const handleBedSetupChange = (updated: BedSetupData) => {
    setListingData({ ...listingData, bedSetup: updated });
  };

  const reconcileBedSetup = (current: BedSetupData, bedroomCount: number): BedSetupData => {
    const existing = current.bedrooms;
    if (bedroomCount > existing.length) {
      const additions: BedroomConfig[] = Array.from(
        { length: bedroomCount - existing.length },
        (_, i) => ({
          room: `Bedroom ${existing.length + i + 1}`,
          beds: [{ bedType: "" } as BedEntry],
        })
      );
      return { bedrooms: [...existing, ...additions] };
    }
    return { bedrooms: existing.slice(0, bedroomCount) };
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
        return true;
      case 3:
        return listingData.bedSetup.bedrooms.every(
          (bedroom) =>
            bedroom.beds.length >= 1 &&
            bedroom.beds.every((bed) => bed.bedType !== "")
        );
      case 4:
        return listingData.amenities.length > 0;
      case 5:
        return listingData.photos.length >= 5;
      case 6:
        return (
          listingData.description.title !== "" &&
          listingData.description.description !== ""
        );
      case 7:
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

    if (currentStep === 2) {
      const reconciled = reconcileBedSetup(
        listingData.bedSetup,
        listingData.basics.bedrooms
      );
      setListingData((prev) => ({ ...prev, bedSetup: reconciled }));
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

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      addToast({
        message: "Please complete all required fields",
        type: "error",
      });
      return;
    }

    const bedInfosAttributes = listingData.bedSetup.bedrooms.flatMap((bedroom) =>
      bedroom.beds.map((bed) => ({
        room: bedroom.room,
        bed_type: bed.bedType,
        is_active: true,
      }))
    );

    const payload = {
      property: {
        name: listingData.description.title,
        title: listingData.description.title,
        description: listingData.description.description,
        address: listingData.location.street,
        city: listingData.location.city,
        state: listingData.location.state,
        country: listingData.location.country,
        zipcode: listingData.location.zipcode,
        price: String(listingData.price),
        bedrooms: listingData.basics.bedrooms,
        baths: listingData.basics.bathrooms,
        max_guests: listingData.basics.guests,
        property_type: listingData.propertyType,
        property_images_attributes: listingData.photos.map((url) => ({ url })),
        property_bed_infos_attributes: bedInfosAttributes,
      },
      amenity_names: listingData.amenities,
    };

    setIsSubmitting(true);
    const response = await postApi("/properties", payload);
    setIsSubmitting(false);

    if (response.error) {
      addToast({ message: "Failed to create listing. Please try again.", type: "error" });
      return;
    }

    addToast({ message: "Your listing has been created successfully!", type: "success" });
    navigate("/host/listings");
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
          <BedSetupStep
            bedSetup={listingData.bedSetup}
            onChange={handleBedSetupChange}
          />
        );
      case 4:
        return (
          <AmenitiesStep
            selectedAmenities={listingData.amenities}
            onToggleAmenity={handleAmenityToggle}
          />
        );
      case 5:
        return (
          <PhotosStep
            photos={listingData.photos}
            onAddPhoto={handleAddPhoto}
            onRemovePhoto={handleRemovePhoto}
          />
        );
      case 6:
        return (
          <DescriptionStep
            formData={listingData.description}
            onFormChange={handleDescriptionChange}
          />
        );
      case 7:
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
        return !validateStep(3) ? "Select a bed type for every bed in each room" : "";
      case 4:
        return listingData.amenities.length === 0 ? "Please select at least one amenity" : "";
      case 5:
        return listingData.photos.length < 5 ? `Add ${5 - listingData.photos.length} more photo(s)` : "";
      case 6:
        return !validateStep(6) ? "Please add a title and description" : "";
      case 7:
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
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Publishing..." : "Publish Listing"}
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
