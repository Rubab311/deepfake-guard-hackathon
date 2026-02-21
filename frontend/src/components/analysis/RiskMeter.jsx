export default function RiskMeter({ risk }) {
  const levels = { low: 1, medium: 2, high: 3 };
  const value = levels[risk] ?? 0;
  const width = (value / 3) * 100;

  const barColor = value === 1 ? 'bg-green-500' : value === 2 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Risk Level</span>
        <span className="text-sm font-medium capitalize">{risk ?? 'Unknown'}</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
