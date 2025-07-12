import React from "react";

interface CancellationPolicyProps {
  cancellationPolicy: string;
}

const CancellationPolicy: React.FC<CancellationPolicyProps> = ({
  cancellationPolicy,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Cancellation policy</h3>
      <p className="text-gray-700">{cancellationPolicy}</p>
    </div>
  );
};

export default CancellationPolicy;
