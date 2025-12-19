import React, { useEffect, useState, useMemo } from "react";
import PropertyCard from "./PropertyCard";
import { getApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import type { Properties } from "./types/Properties";
import { useNotice } from "../../context/NoticeContext";
import { useLoader } from "../../context/LoaderContext";
import ChevronLeftIcon from "./subcomponents/ChevronLeftIcon";
import ChevronRightIcon from "./subcomponents/ChevronRightIcon";

const ITEMS_PER_PAGE = 12;

const PropertiesGrid: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Properties[]>([]);
  const [errorLoading, setErrorLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { showNotice } = useNotice();
  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await getApi<Properties[]>("/properties");
        if (response.data) {
          setProperties(response.data);
          setErrorLoading(false);
        } else setErrorLoading(true);
      } catch (error) {
        console.error("Error fetching properties:", error);
        navigate("/500");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [navigate, showNotice, setIsLoading]);

  const stateSections = useMemo(() => {
    const stateMap = new Map<string, Properties[]>();

    properties.forEach((property) => {
      const key = property.state;
      if (!stateMap.has(key)) {
        stateMap.set(key, []);
      }
      stateMap.get(key)?.push(property);
    });

    const sections = Array.from(stateMap.entries())
      .map(([state, props]) => {
        return { state, properties: props };
      })
      .sort((a, b) => b.properties.length - a.properties.length);

    const eligibleStates = sections.filter((s) => s.properties.length >= 5);
    const shuffled = [...eligibleStates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, [properties]);

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = properties.slice(startIndex, endIndex);

  if (errorLoading) return <div>Error loading the properties</div>;
  if (properties.length === 0) return null;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {stateSections.map((section) => (
        <div key={section.state} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Popular in {section.state}
            </h2>
            <button
              onClick={() => navigate(`/properties?state=${section.state}`)}
              className="text-gray-600 hover:text-gray-700 font-medium text-sm hover:underline hover:cursor-pointer"
            >
              View all ({section.properties.length})
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {section.properties.slice(0, 8).map((property) => (
              <div
                key={property.id}
                onClick={() => navigate(`/property/${property.id}`)}
                className="cursor-pointer flex-shrink-0 w-[200px]"
              >
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          All Properties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => navigate(`/property/${property.id}`)}
              className="cursor-pointer"
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-8">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
              <div>
                <nav
                  aria-label="Pagination"
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon />
                  </button>
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page as number)}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer transition-colors ${
                            currentPage === page
                              ? "z-10 bg-red-500 text-white hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-red-50 hover:text-red-500 focus:z-20 focus:outline-offset-0"
                          } ${
                            index === 2 || index === getPageNumbers().length - 3
                              ? "hidden md:inline-flex"
                              : ""
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesGrid;
