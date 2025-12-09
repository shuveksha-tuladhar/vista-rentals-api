import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropertyCard from "../LandingPage/PropertyCard";
import { getApi } from "../../utils/api";
import { useLoader } from "../../context/LoaderContext";
import type { Properties } from "../LandingPage/types/Properties";
import MapView from "./components/MapView";

const PropertiesMapView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  
  const [filteredProperties, setFilteredProperties] = useState<Properties[]>([]);
  const [errorLoading, setErrorLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Properties | null>(null);
  
  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await getApi<Properties[]>("/properties");
        if (response.data) {
          // Filter by state if provided
          const filtered = state 
            ? response.data.filter(p => p.state === state)
            : response.data;
          setFilteredProperties(filtered);
          setErrorLoading(false);
        } else {
          setErrorLoading(true);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        navigate("/500");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [navigate, setIsLoading, state]);

  if (errorLoading) return <div>Error loading the properties</div>;

  return (
    <div className="h-[calc(100vh-80px)] flex">
      <div className="w-1/2 overflow-y-auto p-6 border-r border-gray-200">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {state ? `Properties in ${state}` : "All Properties"}
          </h1>
          <p className="text-gray-600 mt-2">
            {filteredProperties.length} properties found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => navigate(`/property/${property.id}`)}
              onMouseEnter={() => setSelectedProperty(property)}
              onMouseLeave={() => setSelectedProperty(null)}
              className={`cursor-pointer transition-all ${
                selectedProperty?.id === property.id
                  ? "ring-2 ring-red-500 rounded-lg"
                  : ""
              }`}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found</p>
          </div>
        )}
      </div>
      <div className="w-1/2 relative">
        <MapView
          properties={filteredProperties}
          selectedProperty={selectedProperty}
          onPropertySelect={setSelectedProperty}
        />
      </div>
    </div>
  );
};

export default PropertiesMapView;
