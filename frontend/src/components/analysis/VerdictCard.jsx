export default function VerdictCard({ isReal, confidence }) {
  const percentage = Math.round((confidence ?? 0) * 100);

  return (
    <div
      className={`rounded-xl p-6 shadow-sm border-2 ${
        isReal
          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-100'
          : 'bg-red-50 dark:bg-red-950/30 border-red-500 text-red-900 dark:text-red-100'
      }`}
    >
      <p className="text-sm font-medium opacity-90 mb-1">Verdict</p>
      <p className="text-3xl sm:text-4xl font-bold">
        {isReal ? '✓ Real' : '✗ Fake'}
      </p>
      <p className="text-sm mt-2 opacity-80">
        {percentage}% confidence — {isReal ? 'This image appears to be authentic.' : 'This image shows signs of AI generation or manipulation.'}
      </p>
    </div>
  );
}
