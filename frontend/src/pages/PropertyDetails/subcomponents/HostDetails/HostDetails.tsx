import React from "react";
import HostAvatar from "../../../../components/HostAvatar";
import type { Host } from "./type/HostType";

interface HostDetailsProps {
  hostInfo: Host;
}

const HostDetails: React.FC<HostDetailsProps> = ({ hostInfo }) => {
  return (
    <section className="border-b border-gray-300 pb-6 flex items-center gap-4">
      <HostAvatar
        firstName={hostInfo.first_name}
        lastName={hostInfo.last_name}
        avatarUrl={hostInfo.avatar_url}
        size="md"
      />
      <div>
        <h2 className="text-xl font-semibold">{`Hosted by ${hostInfo.first_name} ${hostInfo.last_name}`}</h2>
        <p className="text-gray-700 mt-1">{hostInfo.host.bio}</p>
      </div>
    </section>
  );
};

export default HostDetails;
