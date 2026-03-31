import Link from 'next/link';
import type { Metadata } from 'next';
import { categories, industries, tools, comparisons } from '@/lib/data';

export const metadata: Metadata = {
  title: 'BestForMy - Find the Best Software for Your Business',
  description:
    'Compare and find the best SaaS tools for your industry. Honest reviews, real comparisons, and expert recommendations.',
  alternates: { canonical: 'https://bestformy.com' },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Find the <span className="text-accent-400">Best Software</span> for
            Your Business
          </h1>
          <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
            Honest reviews and side-by-side comparisons of CRM, project
            management, invoicing, and more — tailored to your industry.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/best/${cat.slug}/for/landscaping`}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
              >
                Best {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Industry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Browse by Industry
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Find the best tools tailored to your specific industry.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={`/best/crm/for/${ind.slug}`}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-primary-300 transition-all"
            >
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {ind.name}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {categories.length} categories
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Popular Comparisons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comparisons.map((comp) => {
              const toolA = tools.find((t) => t.slug === comp.toolA);
              const toolB = tools.find((t) => t.slug === comp.toolB);
              if (!toolA || !toolB) return null;
              return (
                <Link
                  key={comp.slug}
                  href={`/compare/${comp.slug}`}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5 hover:shadow-md border border-gray-200 dark:border-gray-600 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {toolA.name}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">VS</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {toolB.name}
                    </span>
                  </div>
                  <p className="text-xs text-primary-600 dark:text-primary-300 font-medium">
                    Compare now &rarr;
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Top-Rated Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools
            .sort((a, b) => b.score - a.score)
            .slice(0, 6)
            .map((tool) => (
              <Link
                key={tool.slug}
                href={`/tool/${tool.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-gray-700 flex items-center justify-center font-bold text-primary-600 dark:text-primary-300">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Score: {tool.score.toFixed(1)}/10
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tool.description}
                </p>
              </Link>
            ))}
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'BestForMy',
            url: 'https://bestformy.com',
            description:
              'Compare and find the best SaaS tools for your industry.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://bestformy.com/?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </>
  );
}
