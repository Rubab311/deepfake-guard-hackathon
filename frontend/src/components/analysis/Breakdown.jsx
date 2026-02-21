import Badge from '../common/Badge';

export default function Breakdown({ factors = [] }) {
  if (!factors.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Factor Breakdown</h3>
      <ul className="space-y-4">
        {factors.map((factor, i) => (
          <li key={i} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
            <div className="flex justify-between items-start gap-3 mb-1">
              <span className="text-gray-700 dark:text-gray-300 font-medium">{factor.name}</span>
              <Badge variant={factor.status}>{factor.value}</Badge>
            </div>
            {factor.explanation && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {factor.explanation}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
