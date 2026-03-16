import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus, FaTrash, FaSpinner } from "react-icons/fa6";
import HostNavbar from "../../components/HostNavbar";
import { getApi, patchApi, postApi } from "../../utils/api";
import { useToastStore } from "../../store/toastStore";
import { AMENITIES_LIST } from "../../utils/amenities";
import type { EditListingFormValues, HostListing } from "./types";

interface PriceSuggestion {
  min: number;
  max: number;
  reasoning: string;
}

interface SuggestPriceResponse {
  data: PriceSuggestion | null;
  error: string | null;
}

interface HostListingsResponse {
  data: HostListing[];
  error: string | null;
}

interface UpdateResponse {
  data: HostListing | null;
  error: string | null;
}

interface AmenitiesResponse {
  id: number;
  name: string;
}

const EditListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [amenityOptions, setAmenityOptions] = useState<AmenitiesResponse[]>([]);
  const [amenitiesLoading, setAmenitiesLoading] = useState(true);
  const [amenitiesError, setAmenitiesError] = useState<string | null>(null);

  const [sliderValue, setSliderValue] = useState(100);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [isSuggestingPrice, setIsSuggestingPrice] = useState(false);
  const [priceSuggestion, setPriceSuggestion] = useState<PriceSuggestion | null>(null);
  const [hasRequestedSuggestion, setHasRequestedSuggestion] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditListingFormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      property_type: "",
      city: "",
      state: "",
      bedrooms: 1,
      max_guests: 1,
      photos: [""],
      amenity_names: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "photos" as never,
  });

  const selectedAmenities = watch("amenity_names");
  const watchedPhotos = watch("photos");
  const watchedPropertyType = watch("property_type");
  const watchedCity = watch("city");
  const watchedState = watch("state");
  const watchedBedrooms = watch("bedrooms");
  const watchedMaxGuests = watch("max_guests");

  const fetchAmenities = async () => {
    setAmenitiesLoading(true);
    setAmenitiesError(null);
    const response = await getApi<AmenitiesResponse[]>("/amenities");
    if (response.error || !response.data) {
      setAmenitiesError("Failed to load amenities.");
    } else {
      setAmenityOptions(response.data);
    }
    setAmenitiesLoading(false);
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      const response = await getApi<HostListingsResponse>("/host/listings");
      if (response.error || !response.data) {
        setFetchError("Failed to load listing.");
        setLoading(false);
        return;
      }

      const listing = response.data.data?.find((l) => String(l.id) === id);
      if (!listing) {
        setFetchError("Listing not found.");
        setLoading(false);
        return;
      }

      const price = Number(listing.price) || 100;
      setSliderValue(price);
      reset({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        property_type: listing.property_type,
        city: listing.city,
        state: listing.state,
        bedrooms: listing.bedrooms,
        max_guests: listing.max_guests,
        photos:
          listing.property_images.length > 0
            ? listing.property_images.map((img) => img.url)
            : [""],
        amenity_names: listing.amenities.map((a) => a.name),
      });
      setLoading(false);
    };

    fetchListing();
  }, [id, reset]);

  const toggleAmenity = (name: string) => {
    const current = watch("amenity_names");
    if (current.includes(name)) {
      setValue(
        "amenity_names",
        current.filter((a) => a !== name),
        { shouldValidate: true }
      );
    } else {
      setValue("amenity_names", [...current, name], { shouldValidate: true });
    }
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    setValue("price", String(value), { shouldValidate: true });
  };

  const handlePriceInputChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 1 && num <= 2000) {
      setSliderValue(num);
    }
    setValue("price", value, { shouldValidate: true });
  };

  const suggestPrice = async () => {
    if (!id || !watchedPropertyType || !watchedCity || !watchedState || !watchedBedrooms || !watchedMaxGuests) {
      addToast({ message: "Please fill in all listing details first.", type: "error" });
      return;
    }

    setIsSuggestingPrice(true);
    const response = await postApi<SuggestPriceResponse>("/host/ai/suggest-price", {
      property_id: Number(id),
      property_type: watchedPropertyType,
      city: watchedCity,
      state: watchedState,
      bedrooms: Number(watchedBedrooms),
      max_guests: Number(watchedMaxGuests),
      amenities: selectedAmenities || [],
    });
    setIsSuggestingPrice(false);

    if (response.error || !response.data) {
      addToast({ message: response.error || "Failed to get price suggestion.", type: "error" });
      return;
    }

    setPriceSuggestion(response.data);
    setHasRequestedSuggestion(true);
  };

  const onSubmit = async (values: EditListingFormValues) => {
    setIsSubmitting(true);
    const response = await patchApi<UpdateResponse>(`/host/listings/${id}`, {
      property: {
        title: values.title,
        description: values.description,
        price: values.price,
      },
      photos: values.photos,
      amenity_names: values.amenity_names,
    });
    setIsSubmitting(false);

    if (response.error || !response.data) {
      addToast({ message: "Failed to update listing. Please try again.", type: "error" });
      return;
    }

    addToast({ message: "Listing updated successfully.", type: "success" });
    navigate("/host/listings");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <HostNavbar />
        <div className="flex items-center justify-center py-24">
          <p className="text-gray-500">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <HostNavbar />
        <div className="flex items-center justify-center py-24">
          <p className="text-red-500">{fetchError}</p>
        </div>
      </div>
    );
  }

  const iconMap = Object.fromEntries(AMENITIES_LIST.map((a) => [a.name, a.icon]));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HostNavbar />

      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 pb-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Listing</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Listing details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Title
                </label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-3">
                ${sliderValue} <span className="text-base font-normal text-gray-500">/ night</span>
              </p>
              <input
                type="range"
                min={1}
                max={2000}
                step={1}
                value={sliderValue}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full accent-gray-900 mb-3"
              />
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Price per night ($)
                </label>
                <input
                  type="number"
                  min={1}
                  max={2000}
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be at least 1" },
                  })}
                  onChange={(e) => handlePriceInputChange(e.target.value)}
                  className="w-28 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <button
                  type="button"
                  onClick={suggestPrice}
                  disabled={isSuggestingPrice}
                  className="ml-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSuggestingPrice ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      Suggesting...
                    </>
                  ) : (
                    "Suggest a Price"
                  )}
                </button>
              </div>
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
              )}
              {hasRequestedSuggestion && priceSuggestion && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-sm font-semibold text-gray-900 mb-2">AI Price Suggestion</p>
                  <p className="text-lg font-bold text-gray-900 mb-2">
                    ${priceSuggestion.min} – ${priceSuggestion.max} / night
                  </p>
                  <p className="text-sm text-gray-600">{priceSuggestion.reasoning}</p>
                </div>
              )}
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {fields.map((field, index) => {
                const url = watchedPhotos?.[index] ?? "";
                return (
                  <div key={field.id} className="relative group">
                    {url ? (
                      <>
                        <img
                          src={url}
                          alt=""
                          title={url}
                          className="h-32 w-full object-cover rounded-lg"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                            (e.currentTarget.nextElementSibling as HTMLElement).style.display = "block";
                          }}
                        />
                        <div
                          className="h-32 w-full rounded-lg bg-gray-100"
                          style={{ display: "none" }}
                        />
                      </>
                    ) : (
                      <div className="h-32 w-full rounded-lg bg-gray-100" />
                    )}
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-700"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {showAddPhoto ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newPhotoUrl.trim()) {
                        append(newPhotoUrl.trim() as never);
                        setNewPhotoUrl("");
                        setShowAddPhoto(false);
                      }
                    }
                  }}
                  placeholder="https://..."
                  autoFocus
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newPhotoUrl.trim()) {
                      append(newPhotoUrl.trim() as never);
                      setNewPhotoUrl("");
                    }
                    setShowAddPhoto(false);
                  }}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => { setNewPhotoUrl(""); setShowAddPhoto(false); }}
                  className="px-4 py-2 text-sm text-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddPhoto(true)}
                className="flex items-center gap-2 text-sm border border-gray-300 rounded-lg px-4 py-2 text-gray-700 cursor-pointer"
              >
                <FaPlus className="text-xs" />
                Add photo
              </button>
            )}
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h2>
            {amenitiesLoading ? (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-8 w-28 rounded-full bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : amenitiesError ? (
              <div>
                <p className="text-red-500 text-sm mb-2">{amenitiesError}</p>
                <button
                  type="button"
                  onClick={fetchAmenities}
                  className="text-sm border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((amenity) => {
                  const selected = selectedAmenities.includes(amenity.name);
                  const Icon = iconMap[amenity.name];
                  return (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => toggleAmenity(amenity.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${
                        selected
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >
                      {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
                      {amenity.name}
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-end">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/host/listings")}
              className="py-3 px-6 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="edit-listing-form"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="py-3 px-6 bg-black text-white rounded-lg text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditListingPage;
