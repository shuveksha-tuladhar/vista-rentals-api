import React from "react";
import type { BedSetupData, BedroomConfig } from "../types";
import BedroomCard from "./BedroomCard";

interface BedSetupStepProps {
  bedSetup: BedSetupData;
  onChange: (updated: BedSetupData) => void;
}

const BedSetupStep: React.FC<BedSetupStepProps> = ({ bedSetup, onChange }) => {
  const handleBedroomChange = (index: number, updated: BedroomConfig) => {
    const bedrooms = bedSetup.bedrooms.map((bedroom, i) =>
      i === index ? updated : bedroom
    );
    onChange({ ...bedSetup, bedrooms });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-2">Set up your beds</h2>
      <p className="text-gray-600 mb-8">
        Tell guests what kind of beds are available in each room
      </p>

      <div className="space-y-6">
        {bedSetup.bedrooms.map((bedroom, index) => (
          <BedroomCard
            key={bedroom.room}
            config={bedroom}
            onChange={(updated) => handleBedroomChange(index, updated)}
          />
        ))}
      </div>
    </div>
  );
};

export default BedSetupStep;
