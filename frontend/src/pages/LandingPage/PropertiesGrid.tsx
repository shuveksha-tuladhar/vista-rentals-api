import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { getApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import type { Properties } from "./types/Properties";

// const properties = [
//   {
//     id: 1,
//     image:
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-1442072486844571600/original/ecfb6004-befa-4e90-bc64-deb7012f6975.jpeg?im_w=1200",
//     location: "London, United Kingdom",
//     rating: 4.8,
//     distance: "100 kilometers away",
//     date: "Jan 1 - 7",
//     price: "$120",
//   },
//   {
//     id: 2,
//     image:
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTUyOTc3NzU%3D/original/5a3485a7-8fc3-4b30-8ef3-cac876feafe7.jpeg?im_w=1200",
//     location: "Paris, France",
//     rating: 4.9,
//     distance: "200 kilometers away",
//     date: "Feb 10 - 15",
//     price: "$150",
//   },
//   {
//     id: 3,
//     image:
//       "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1110580750895991230/original/a68069e7-c70c-4f04-8977-1b758c7ae2a6.png?im_w=720",
//     location: "New York, USA",
//     rating: 4.7,
//     distance: "50 kilometers away",
//     date: "Mar 5 - 12",
//     price: "$180",
//   },
//   {
//     id: 4,
//     image:
//       "https://a0.muscache.com/im/pictures/miso/Hosting-1414181305573306468/original/cbc9feab-4745-42d2-a3ee-9e3a9570a562.jpeg?im_w=1200",
//     location: "Tokyo, Japan",
//     rating: 4.6,
//     distance: "300 kilometers away",
//     date: "Apr 20 - 25",
//     price: "$100",
//   },
//   {
//     id: 5,
//     image:
//       "https://a0.muscache.com/im/pictures/miso/Hosting-1274448936269044278/original/9490f96a-28ea-44b7-81ac-8072cf0baf45.jpeg?im_w=1200",
//     location: "Sydney, Australia",
//     rating: 4.9,
//     distance: "400 kilometers away",
//     date: "May 1 - 8",
//     price: "$200",
//   },
//   {
//     id: 6,
//     image:
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMjY1MjE5ODA0NDA0ODkyNw%3D%3D/original/c260ce56-213d-4e2c-bba5-07e8b0c5f14c.jpeg?im_w=1200",
//     location: "Rome, Italy",
//     rating: 4.5,
//     distance: "150 kilometers away",
//     date: "Jun 15 - 22",
//     price: "$130",
//   },
//   {
//     id: 7,
//     image:
//       "https://a0.muscache.com/im/pictures/miso/Hosting-648932373954864346/original/57d90312-cb59-4206-adef-51114e24f27c.jpeg?im_w=1200",
//     location: "Berlin, Germany",
//     rating: 4.7,
//     distance: "250 kilometers away",
//     date: "Jul 1 - 7",
//     price: "$110",
//   },
//   {
//     id: 8,
//     image:
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM2MTIwNTUzMDM0NTMxNzA4Mw==/original/07d539f6-209a-45db-99bf-2b828ded66d2.jpeg?im_w=1200",
//     location: "Rio de Janeiro, Brazil",
//     rating: 4.8,
//     distance: "500 kilometers away",
//     date: "Aug 10 - 18",
//     price: "$160",
//   },
//   {
//     id: 11,
//     image:
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-1442072486844571600/original/ecfb6004-befa-4e90-bc64-deb7012f6975.jpeg?im_w=1200",
//     location: "London, United Kingdom",
//     rating: 4.8,
//     distance: "100 kilometers away",
//     date: "Jan 1 - 7",
//     price: "$120",
//   },
//   {
//     id: 12,
//     image:
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTUyOTc3NzU%3D/original/5a3485a7-8fc3-4b30-8ef3-cac876feafe7.jpeg?im_w=1200",
//     location: "Paris, France",
//     rating: 4.9,
//     distance: "200 kilometers away",
//     date: "Feb 10 - 15",
//     price: "$150",
//   },
//   {
//     id: 13,
//     image:
//       "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1110580750895991230/original/a68069e7-c70c-4f04-8977-1b758c7ae2a6.png?im_w=720",
//     location: "New York, USA",
//     rating: 4.7,
//     distance: "50 kilometers away",
//     date: "Mar 5 - 12",
//     price: "$180",
//   },
//   {
//     id: 14,
//     image:
//       "https://a0.muscache.com/im/pictures/miso/Hosting-1414181305573306468/original/cbc9feab-4745-42d2-a3ee-9e3a9570a562.jpeg?im_w=1200",
//     location: "Tokyo, Japan",
//     rating: 4.6,
//     distance: "300 kilometers away",
//     date: "Apr 20 - 25",
//     price: "$100",
//   },
//   {
//     id: 15,
//     image:
//       "https://a0.muscache.com/im/pictures/miso/Hosting-1274448936269044278/original/9490f96a-28ea-44b7-81ac-8072cf0baf45.jpeg?im_w=1200",
//     location: "Sydney, Australia",
//     rating: 4.9,
//     distance: "400 kilometers away",
//     date: "May 1 - 8",
//     price: "$200",
//   },
//   {
//     id: 16,
//     image:
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMjY1MjE5ODA0NDA0ODkyNw%3D%3D/original/c260ce56-213d-4e2c-bba5-07e8b0c5f14c.jpeg?im_w=1200",
//     location: "Rome, Italy",
//     rating: 4.5,
//     distance: "150 kilometers away",
//     date: "Jun 15 - 22",
//     price: "$130",
//   },
//   {
//     id: 17,
//     image:
//       "https://a0.muscache.com/im/pictures/miso/Hosting-648932373954864346/original/57d90312-cb59-4206-adef-51114e24f27c.jpeg?im_w=1200",
//     location: "Berlin, Germany",
//     rating: 4.7,
//     distance: "250 kilometers away",
//     date: "Jul 1 - 7",
//     price: "$110",
//   },
//   {
//     id: 18,
//     image:
//       "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM2MTIwNTUzMDM0NTMxNzA4Mw==/original/07d539f6-209a-45db-99bf-2b828ded66d2.jpeg?im_w=1200",
//     location: "Rio de Janeiro, Brazil",
//     rating: 4.8,
//     distance: "500 kilometers away",
//     date: "Aug 10 - 18",
//     price: "$160",
//   },
// ];

const PropertiesGrid: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Properties[]>([]);
  const [loading, setLoading] = useState(true);

  console.log("properties", properties);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getApi<Properties[]>("/properties");
        console.log("Response Data", response.data);
        if (response.data) setProperties(response.data);
        else navigate("/500");
      } catch (error) {
        console.error("Error fetching properties:", error);
        navigate("/500");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (properties.length === 0) return <div>No properties found.</div>;

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-10">
        {[...properties, ...properties].map((property) => (
          <div
            key={property.id}
            onClick={() => navigate(`/property/${property.id}`)}
            className="cursor-pointer"
          >
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default PropertiesGrid;
