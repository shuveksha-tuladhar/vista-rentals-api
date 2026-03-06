interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
}

export default function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
        {label}
      </p>
      <p className="text-2xl font-semibold text-black leading-none">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
