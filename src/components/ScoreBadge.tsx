export default function ScoreBadge({ score }: { score: number }) {
  const colorClass =
    score >= 8.5
      ? 'bg-green-600'
      : score >= 7
        ? 'bg-yellow-500'
        : 'bg-red-500';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg font-bold text-white px-3 py-1 text-sm ${colorClass}`}
    >
      {score.toFixed(1)}
    </span>
  );
}
