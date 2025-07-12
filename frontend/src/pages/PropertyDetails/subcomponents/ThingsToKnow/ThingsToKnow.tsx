import React from "react";
import HouseRules from "./HouseRules/HouseRules";
import SafetyNotes from "./SafetyNotes/SafetyNotes";
import CancellationPolicy from "./CancellationPolicy/CancellationPolicy";

interface ThingsToKnowProps {
  rules: string[];
  safetyNotes?: string[];
  cancellationPolicy?: string;
}

const ThingsToKnow: React.FC<ThingsToKnowProps> = ({
  rules,
  safetyNotes = [],
  cancellationPolicy = "Free cancellation before check-in. No refund after check-in.",
}) => {
  return (
    <section className="border-b border-gray-300 pb-6">
      <h2 className="text-2xl font-semibold mb-6">Things to know</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HouseRules rules={rules} />
        <SafetyNotes safetyNotes={safetyNotes} />
        <CancellationPolicy cancellationPolicy={cancellationPolicy} />
      </div>
    </section>
  );
};

export default ThingsToKnow;
