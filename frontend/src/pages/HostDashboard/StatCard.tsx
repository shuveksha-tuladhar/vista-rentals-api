import { BsQuestionCircle } from "react-icons/bs";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  tooltip?: string;
}

export default function StatCard({ label, value, sub, tooltip }: StatCardProps) {
  return (
    <div className="border border-gray-200 bg-white px-3 py-3">
      <div className="flex items-center gap-1 mb-1">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        {tooltip && (
          <div className="relative group">
            <BsQuestionCircle className="text-gray-400 w-3 h-3 cursor-default" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-10 w-52 bg-gray-900 text-white text-[11px] leading-snug px-2.5 py-1.5 pointer-events-none">
              {tooltip}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        )}
      </div>
      <p className="text-lg font-semibold text-black leading-tight">{value}</p>
      {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}
