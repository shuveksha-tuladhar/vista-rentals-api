import React from "react";

interface SafetyNotesProps {
  safetyNotes?: string[];
}

const SafetyNotes: React.FC<SafetyNotesProps> = ({ safetyNotes = [] }) => {
  return (
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
  );
};

export default SafetyNotes;
