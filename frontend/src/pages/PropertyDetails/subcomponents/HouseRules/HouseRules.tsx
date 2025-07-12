interface HouseRulesProps {
  rules: string[];
}

const HouseRules: React.FC<HouseRulesProps> = ({ rules }) => {
  if (!rules || rules.length === 0) return null;

  return (
    <section className="border-b border-gray-300 pb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        House Rules
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {rules.map((rule, idx) => (
          <li key={idx}>{rule}</li>
        ))}
      </ul>
    </section>
  );
};

export default HouseRules;
