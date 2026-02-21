export default function ScoreCard({ score, label }) {
  const percentage = Math.round((score ?? 0) * 100);
  const color = percentage >= 70 ? 'text-green-600' : percentage >= 40 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className={`text-4xl font-bold ${color}`}>{percentage}%</p>
    </div>
  );
}
