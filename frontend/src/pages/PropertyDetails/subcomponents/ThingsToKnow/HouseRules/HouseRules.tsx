interface HouseRulesProps {
  rules: string[];
}

const HouseRules: React.FC<HouseRulesProps> = ({ rules }) => {
  if (!rules || rules.length === 0) return null;

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        House Rules
      </h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {rules.map((rule, idx) => (
          <li key={idx}>{rule}</li>
        ))}
      </ul>
    </section>
  );
};

export default HouseRules;
