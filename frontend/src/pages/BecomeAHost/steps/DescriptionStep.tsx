import React from "react";

interface DescriptionStepProps {
  formData: {
    title: string;
    description: string;
  };
  onFormChange: (field: string, value: string) => void;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({
  formData,
  onFormChange,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-2">
        Now, let's give your place a title
      </h2>
      <p className="text-gray-600 mb-8">
        Short titles work best. Have fun with it—you can always change it later.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <textarea
            value={formData.title}
            onChange={(e) => onFormChange("title", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
            rows={2}
            maxLength={50}
            placeholder="Cozy apartment in the heart of the city"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.title.length}/50
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Create your description
          </h3>
          <p className="text-gray-600 mb-4">
            Share what makes your place special
          </p>
          <textarea
            value={formData.description}
            onChange={(e) => onFormChange("description", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
            rows={8}
            maxLength={500}
            placeholder="Describe your property, the neighborhood, and what guests will love about staying here..."
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.description.length}/500
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionStep;
