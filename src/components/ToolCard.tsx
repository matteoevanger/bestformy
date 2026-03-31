import Link from 'next/link';
import ScoreBadge from './ScoreBadge';
import type { Tool } from '@/lib/types';

export default function ToolCard({
  tool,
  rank,
}: {
  tool: Tool;
  rank: number;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-primary-600 dark:text-primary-300">
            #{rank}
          </span>
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg font-bold text-primary-600 dark:text-primary-300">
            {tool.name.charAt(0)}
          </div>
          <div>
            <Link
              href={`/tool/${tool.slug}`}
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
            >
              {tool.name}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Starting at {tool.pricing[0].price}
            </p>
          </div>
        </div>
        <ScoreBadge score={tool.score} />
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {tool.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <h4 className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase mb-1">
            Pros
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {tool.pros.slice(0, 2).map((pro) => (
              <li key={pro} className="flex items-start gap-1">
                <span className="text-green-500 mt-0.5">+</span> {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase mb-1">
            Cons
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {tool.cons.slice(0, 2).map((con) => (
              <li key={con} className="flex items-start gap-1">
                <span className="text-red-500 mt-0.5">-</span> {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={tool.affiliateUrl}
          className="inline-flex items-center px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-lg transition-colors"
          rel="nofollow noopener"
        >
          Visit {tool.name}
        </a>
        <Link
          href={`/tool/${tool.slug}`}
          className="text-sm text-primary-600 dark:text-primary-300 hover:underline"
        >
          Full Review
        </Link>
      </div>
    </div>
  );
}
