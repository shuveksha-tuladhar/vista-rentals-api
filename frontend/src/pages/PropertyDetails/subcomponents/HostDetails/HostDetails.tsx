import React from "react";

interface Host {
  name: string;
  avatar: string;
  bio: string;
}

interface HostDetailsProps {
  host: Host;
}

const HostDetails: React.FC<HostDetailsProps> = ({ host }) => {
  return (
    <section className="border-b border-gray-300 pb-6 flex items-center gap-4">
      <img
        src={host.avatar}
        alt={`Host ${host.name}`}
        className="w-20 h-20 rounded-full object-cover border"
      />
      <div>
        <h2 className="text-xl font-semibold">Hosted by {host.name}</h2>
        <p className="text-gray-700 mt-1">{host.bio}</p>
      </div>
    </section>
  );
};

export default HostDetails;
