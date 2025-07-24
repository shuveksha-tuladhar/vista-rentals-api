import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { getApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import type { Properties } from "./types/Properties";
import { useNotice } from "../../context/NoticeContext";

const PropertiesGrid: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Properties[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);

  const { showNotice } = useNotice();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getApi<Properties[]>("/properties");
        if (response.data) {
          setProperties(response.data);
          setErrorLoading(false);
        } else setErrorLoading(true);
      } catch (error) {
        console.error("Error fetching properties:", error);
        navigate("/500");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate, showNotice]);

  if (loading) return <div>Loading...</div>;
  if (errorLoading) return <div>Error loading the properties</div>;
  if (properties.length === 0) return <div>No properties found.</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-10">
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => navigate(`/property/${property.id}`)}
            className="cursor-pointer"
          >
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesGrid;
