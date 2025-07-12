import React from "react";
import HouseRules from "./HouseRules/HouseRules";

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
        {/* House Rules */}
        <HouseRules rules={rules} />

        {/* Safety & Property */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Safety & property</h3>
          {safetyNotes.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {safetyNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No safety notes provided.</p>
          )}
        </div>

        {/* Cancellation Policy */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Cancellation policy</h3>
          <p className="text-gray-700">{cancellationPolicy}</p>
        </div>
      </div>
    </section>
  );
};

export default ThingsToKnow;
