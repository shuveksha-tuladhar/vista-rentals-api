import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import type { BedroomConfig, BedEntry, BedType } from "../types";

interface BedroomCardProps {
  config: BedroomConfig;
  onChange: (updated: BedroomConfig) => void;
}

const BED_TYPES: BedType[] = ["King", "Queen", "Double", "Single", "Sofa Bed", "Bunk Bed"];

const BedroomCard: React.FC<BedroomCardProps> = ({ config, onChange }) => {
  const updateBed = (index: number, bedType: BedType) => {
    const beds = config.beds.map((bed, i) => (i === index ? { ...bed, bedType } : bed));
    onChange({ ...config, beds });
  };

  const removeBed = (index: number) => {
    const beds = config.beds.filter((_, i) => i !== index);
    onChange({ ...config, beds });
  };

  const addBed = () => {
    const beds: BedEntry[] = [...config.beds, { bedType: "" }];
    onChange({ ...config, beds });
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{config.room}</h3>

      <div className="space-y-4">
        {config.beds.map((bed, index) => (
          <div key={index} className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {BED_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateBed(index, type)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    bed.bedType === type
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeBed(index)}
              disabled={config.beds.length === 1}
              className={`flex items-center gap-1 text-sm ${
                config.beds.length === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:text-red-500 cursor-pointer"
              }`}
            >
              <FaTrash className="text-xs" />
              Remove bed
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addBed}
        className="flex items-center gap-2 text-sm border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:border-gray-500 cursor-pointer"
      >
        <FaPlus className="text-xs" />
        Add a bed
      </button>
    </div>
  );
};

export default BedroomCard;
