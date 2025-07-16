import React from "react";
import type { Host } from "./type/HostType";

interface HostDetailsProps {
  hostInfo: Host;
}

const HostDetails: React.FC<HostDetailsProps> = ({ hostInfo }) => {
  return (
    <section className="border-b border-gray-300 pb-6 flex items-center gap-4">
      <img
        src={hostInfo.avatar_url}
        alt={`Host ${hostInfo.first_name} ${hostInfo.last_name}`}
        className="w-20 h-20 rounded-full object-cover border"
      />
      <div>
        <h2 className="text-xl font-semibold">{`Hosted by ${hostInfo.first_name} ${hostInfo.last_name}`}</h2>
        <p className="text-gray-700 mt-1">{hostInfo.host.bio}</p>
      </div>
    </section>
  );
};

export default HostDetails;
