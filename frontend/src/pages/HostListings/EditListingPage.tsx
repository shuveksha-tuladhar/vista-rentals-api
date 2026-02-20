import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/fa6";
import HostNavbar from "../../components/HostNavbar";
import { getApi, patchApi } from "../../utils/api";
import { useToastStore } from "../../store/toastStore";
import type { EditListingFormValues, HostListing } from "./types";

interface HostListingsResponse {
  data: HostListing[];
  error: string | null;
}

interface UpdateResponse {
  data: HostListing | null;
  error: string | null;
}

const amenitiesList = [
  "Wi-Fi",
  "TV",
  "Air conditioning",
  "Heating",
  "Washer",
  "Dryer",
  "Kitchen",
  "Refrigerator",
  "Microwave",
  "Dishwasher",
  "Coffee maker",
  "Hot water",
  "Iron",
  "Hair dryer",
  "Hangers",
  "Bed linens",
  "Extra pillows and blankets",
  "Shampoo",
  "Conditioner",
  "Body soap",
  "Toilet paper",
  "Towels",
  "Bathtub",
  "Private bathroom",
  "Smart TV",
  "Patio or balcony",
  "BBQ grill",
  "Fire pit",
  "Free parking on premises",
  "Paid parking on premises",
  "EV charger",
  "Pool",
  "Hot tub",
  "Gym",
  "Elevator",
  "Smoke alarm",
  "Carbon monoxide alarm",
  "First aid kit",
  "Fire extinguisher",
  "Security cameras on property",
  "Dedicated workspace",
  "High-speed Wi-Fi",
  "Wheelchair accessible",
  "Pets allowed",
  "Self check-in",
];

const EditListingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      photos: [""],
      amenity_names: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "photos" as never,
  });

  const selectedAmenities = watch("amenity_names");

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

      reset({
        title: listing.title,
        description: listing.description,
        price: listing.price,
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HostNavbar />

      <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Listing</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price per night ($)
            </label>
            <input
              type="number"
              min={1}
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be at least 1" },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Photos
            </label>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <input
                    {...register(`photos.${index}` as const, {
                      required: "Photo URL is required",
                    })}
                    placeholder="https://..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-gray-400"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append("" as never)}
              className="mt-3 flex items-center gap-2 text-sm border border-gray-300 rounded-lg px-4 py-2 text-gray-700 cursor-pointer"
            >
              <FaPlus className="text-xs" />
              Add photo
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((name) => {
                const selected = selectedAmenities.includes(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleAmenity(name)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                      selected
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/host/listings")}
              className="flex-1 py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-black text-white rounded-lg text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListingPage;
