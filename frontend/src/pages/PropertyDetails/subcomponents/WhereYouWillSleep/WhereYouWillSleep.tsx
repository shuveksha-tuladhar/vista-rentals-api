import { FaBed } from "react-icons/fa6";

interface BedInfo {
  room: string;
  bed_type: string;
  is_active: boolean;
}

interface WhereYouWillSleepProps {
  bedInfo: BedInfo[];
}

const WhereYouWillSleep: React.FC<WhereYouWillSleepProps> = ({ bedInfo }) => {
  if (!bedInfo || bedInfo.length === 0) return null;

  return (
    <section className="py-10 relative w-full max-w-5xl">
      <h2 className="text-xl font-semibold text-[#222222] leading-[31px]">
        Where you’ll sleep
      </h2>

      <hr className="absolute bottom-[-6px] left-0 w-full border-t border-[#DDDDDD]" />

      <div className="mt-6 flex flex-wrap gap-4">
        {bedInfo.map((bed, idx) => (
          <div
            key={idx}
            className="w-[160px] h-[130px] border border-[#DDDDDD] rounded-lg p-5 flex flex-col justify-start gap-4"
          >
            <FaBed className="text-[#222222] text-2xl" />
            <div className="flex flex-col gap-1">
              <p className="text-[16px] font-semibold leading-[23px] text-[#222222]">
                {bed.room}
              </p>
              <p className="text-[14px] font-light leading-[23px] text-[#222222]">
                {bed.bed_type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhereYouWillSleep;
