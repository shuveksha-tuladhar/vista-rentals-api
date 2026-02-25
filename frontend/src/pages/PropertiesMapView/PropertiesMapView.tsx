import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaMap, FaList } from "react-icons/fa6";
import PropertyCard from "../LandingPage/PropertyCard";
import { getApi } from "../../utils/api";
import { useLoader } from "../../context/LoaderContext";
import type { Properties } from "../LandingPage/types/Properties";
import MapView from "./components/MapView";

const PropertiesMapView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const state = searchParams.get("state");
  const city = searchParams.get("city");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  const [filteredProperties, setFilteredProperties] = useState<Properties[]>([]);
  const [nearbyProperties, setNearbyProperties] = useState<Properties[]>([]);
  const [errorLoading, setErrorLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Properties | null>(null);
  const [showMap, setShowMap] = useState(false);

  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);

        const params = new URLSearchParams();
        if (state) params.append("state", state);
        if (city) params.append("city", city);
        if (checkIn) params.append("checkIn", checkIn);
        if (checkOut) params.append("checkOut", checkOut);
        if (guests) params.append("guests", guests);

        const queryString = params.toString();
        const endpoint = `/properties${queryString ? `?${queryString}` : ""}`;

        const response = await getApi<Properties[]>(endpoint);
        if (response.data) {
          setFilteredProperties(response.data);
          setErrorLoading(false);
        } else {
          setErrorLoading(true);
        }

        if (city && state) {
          const nearbyParams = new URLSearchParams();
          nearbyParams.append("state", state);
          if (checkIn) nearbyParams.append("checkIn", checkIn);
          if (checkOut) nearbyParams.append("checkOut", checkOut);
          if (guests) nearbyParams.append("guests", guests);

          const nearbyResponse = await getApi<Properties[]>(`/properties?${nearbyParams.toString()}`);
          if (nearbyResponse.data) {
            const nearby = nearbyResponse.data.filter(
              (p) => p.city.toLowerCase() !== city.toLowerCase()
            );
            setNearbyProperties(nearby);
          }
        } else {
          setNearbyProperties([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        navigate("/500");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [navigate, setIsLoading, state, city, checkIn, checkOut, guests]);

  if (errorLoading) return <div>Error loading the properties</div>;

  const heading = city && state
    ? `Properties in ${city}, ${state}`
    : state
    ? `Properties in ${state}`
    : "All Properties";

  const filterChips = (
    <div className="flex flex-wrap gap-2 mt-3">
      {checkIn && (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          Check-in: {new Date(checkIn).toLocaleDateString()}
        </span>
      )}
      {checkOut && (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          Check-out: {new Date(checkOut).toLocaleDateString()}
        </span>
      )}
      {guests && (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          Guests: {guests}
        </span>
      )}
    </div>
  );

  const propertyGrid = (cols: string) => (
    <div className={`grid ${cols} gap-4`}>
      {filteredProperties.map((property) => (
        <div
          key={property.id}
          onClick={() => navigate(`/property/${property.id}`)}
          onMouseEnter={() => setSelectedProperty(property)}
          onMouseLeave={() => setSelectedProperty(null)}
          className={`cursor-pointer ${
            selectedProperty?.id === property.id ? "ring-2 ring-red-500 rounded-lg" : ""
          }`}
        >
          <PropertyCard {...property} />
        </div>
      ))}
    </div>
  );

  const nearbySection = (cols: string) =>
    city && state && nearbyProperties.length > 0 ? (
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Popular Properties Nearby in {state}
        </h2>
        <p className="text-gray-600 mb-6">Explore more options in {state}</p>
        <div className={`grid ${cols} gap-4`}>
          {nearbyProperties.slice(0, 6).map((property) => (
            <div
              key={property.id}
              onClick={() => navigate(`/property/${property.id}`)}
              onMouseEnter={() => setSelectedProperty(property)}
              onMouseLeave={() => setSelectedProperty(null)}
              className={`cursor-pointer ${
                selectedProperty?.id === property.id ? "ring-2 ring-red-500 rounded-lg" : ""
              }`}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <>
      {/* ── Mobile ── */}
      <div className="md:hidden relative">
        {showMap ? (
          <div className="h-[calc(100vh-60px)]">
            <MapView
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
            />
          </div>
        ) : (
          <div className="px-4 pt-4 pb-24">
            <h1 className="text-xl font-bold text-gray-900">{heading}</h1>
            <p className="text-gray-600 mt-1 text-sm">
              {filteredProperties.length} properties found
            </p>
            {(checkIn || checkOut || guests) && filterChips}

            <div className="mt-4">
              {filteredProperties.length === 0 ? (
                <p className="text-center text-gray-500 py-12">No properties found</p>
              ) : (
                propertyGrid("grid-cols-1 sm:grid-cols-2")
              )}
            </div>

            {nearbySection("grid-cols-1 sm:grid-cols-2")}
          </div>
        )}

        {/* Toggle button */}
        <div className="fixed bottom-6 inset-x-0 flex justify-center z-[60] pointer-events-none">
          <button
            onClick={() => setShowMap(!showMap)}
            className="pointer-events-auto flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            {showMap ? <FaList className="h-4 w-4" /> : <FaMap className="h-4 w-4" />}
            {showMap ? "Show list" : "Show map"}
          </button>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex h-[calc(100vh-80px)]">
        <div className="w-1/2 overflow-y-auto p-6 border-r border-gray-200">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{heading}</h1>
            <p className="text-gray-600 mt-2">
              {filteredProperties.length} properties found
            </p>
            {(checkIn || checkOut || guests) && filterChips}
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties found</p>
            </div>
          ) : (
            propertyGrid("grid-cols-1 md:grid-cols-3")
          )}

          {nearbySection("grid-cols-1 md:grid-cols-3")}
        </div>

        <div className="w-1/2 relative z-0">
          <MapView
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            onPropertySelect={setSelectedProperty}
          />
        </div>
      </div>
    </>
  );
};

export default PropertiesMapView;
