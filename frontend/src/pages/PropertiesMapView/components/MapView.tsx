import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Properties } from "../../LandingPage/types/Properties";

// Fix for default marker icon issue with Webpack
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapViewProps {
  properties: Properties[];
  selectedProperty: Properties | null;
  onPropertySelect: (property: Properties) => void;
}

// Component to handle map bounds when properties change
const MapBounds: React.FC<{ properties: Properties[] }> = ({ properties }) => {
  const map = useMap();

  useEffect(() => {
    if (properties.length > 0) {
      // Get bounds of all properties
      const validProperties = properties.filter(
        p => p.coordinates_latitude && p.coordinates_longitude
      );
      
      if (validProperties.length > 0) {
        const bounds = validProperties.map(p => [
          parseFloat(p.coordinates_latitude),
          parseFloat(p.coordinates_longitude)
        ] as [number, number]);
        
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [properties, map]);

  return null;
};

const MapView: React.FC<MapViewProps> = ({
  properties,
  onPropertySelect,
}) => {
  // Default center (USA)
  const defaultCenter: [number, number] = [39.8283, -98.5795];

  return (
    <div className="h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={4}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds properties={properties} />
        
        {/* Render markers with real coordinates */}
        {properties.map((property) => {
          // Skip properties without valid coordinates
          if (!property.coordinates_latitude || !property.coordinates_longitude) {
            return null;
          }
          
          const lat = parseFloat(property.coordinates_latitude);
          const lng = parseFloat(property.coordinates_longitude);
          
          // Skip invalid coordinates
          if (isNaN(lat) || isNaN(lng)) {
            return null;
          }
          
          return (
            <Marker
              key={property.id}
              position={[lat, lng]}
              eventHandlers={{
                click: () => onPropertySelect(property),
              }}
            >
              <Popup>
                <div className="w-48">
                  {property.property_images && property.property_images.length > 0 && (
                    <img
                      src={property.property_images[0].url}
                      alt={property.name}
                      className="w-full h-24 object-cover rounded-t-lg mb-2"
                    />
                  )}
                  <div className="px-2 pb-2">
                    <p className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                      {property.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {property.city}, {property.state}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {property.property_type}
                    </p>
                    <p className="text-sm font-semibold text-red-600 mt-1">
                      ${property.price}/night
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
