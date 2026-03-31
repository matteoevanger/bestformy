import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  comparisons,
  getComparisonBySlug,
  getToolBySlug,
  getComparisonsForTool,
} from '@/lib/data';
import ScoreBadge from '@/components/ScoreBadge';
import FAQ from '@/components/FAQ';
import type { FAQItem } from '@/components/FAQ';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) return {};
  const toolA = getToolBySlug(comparison.toolA);
  const toolB = getToolBySlug(comparison.toolB);
  if (!toolA || !toolB) return {};
  const title = `${toolA.name} vs ${toolB.name}: Which is Better in 2026?`;
  const description = `Detailed comparison of ${toolA.name} and ${toolB.name}. See features, pricing, pros & cons side by side to make the right choice.`;
  return {
    title,
    description,
    alternates: {
      canonical: `https://bestformy.com/compare/${comparison.slug}`,
    },
    openGraph: { title, description },
  };
}

export default function ComparisonPage({ params }: Props) {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) notFound();
  const toolA = getToolBySlug(comparison.toolA);
  const toolB = getToolBySlug(comparison.toolB);
  if (!toolA || !toolB) notFound();

  const faqItems: FAQItem[] = [
    {
      question: `Is ${toolA.name} or ${toolB.name} better?`,
      answer: comparison.verdict,
    },
    {
      question: `Which is cheaper, ${toolA.name} or ${toolB.name}?`,
      answer: `${toolA.name} starts at ${toolA.pricing[0].price} while ${toolB.name} starts at ${toolB.pricing[0].price}. However, pricing depends on your team size and required features, so compare the tiers carefully.`,
    },
    {
      question: `Can I migrate from ${toolA.name} to ${toolB.name}?`,
      answer: `Yes, both tools support data import/export. Most users can migrate their data in a few hours. Some tools also offer migration assistance for larger accounts.`,
    },
    {
      question: `Which has better customer support?`,
      answer: `Both ${toolA.name} and ${toolB.name} offer email and chat support. Higher-tier plans from both vendors include priority or phone support. Check the specific plan details for your needs.`,
    },
  ];

  const otherComparisons = [
    ...getComparisonsForTool(toolA.slug),
    ...getComparisonsForTool(toolB.slug),
  ].filter((c) => c.slug !== comparison.slug);
  const uniqueOther = otherComparisons.filter(
    (c, i, arr) => arr.findIndex((x) => x.slug === c.slug) === i
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600">
            Home
          </Link>{' '}
          / <span>Compare</span> /{' '}
          <span>
            {toolA.name} vs {toolB.name}
          </span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          {toolA.name} vs {toolB.name}: Which is Better in 2026?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
          A detailed side-by-side comparison to help you choose between{' '}
          {toolA.name} and {toolB.name}.
        </p>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[toolA, toolB].map((tool) => (
            <div
              key={tool.slug}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-gray-700 flex items-center justify-center font-bold text-xl text-primary-600 dark:text-primary-300">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <Link
                      href={`/tool/${tool.slug}`}
                      className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600"
                    >
                      {tool.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      Starting at {tool.pricing[0].price}
                    </p>
                  </div>
                </div>
                <ScoreBadge score={tool.score} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {tool.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h4 className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase mb-1">
                    Pros
                  </h4>
                  <ul className="text-sm space-y-1">
                    {tool.pros.map((p) => (
                      <li key={p} className="flex items-start gap-1">
                        <span className="text-green-500">+</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase mb-1">
                    Cons
                  </h4>
                  <ul className="text-sm space-y-1">
                    {tool.cons.map((c) => (
                      <li key={c} className="flex items-start gap-1">
                        <span className="text-red-500">-</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Feature-by-Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">
                    {toolA.name}
                  </th>
                  <th className="text-center p-4 font-semibold">
                    {toolB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.featureComparison.map((fc) => (
                  <tr
                    key={fc.feature}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-4 font-medium">{fc.feature}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${fc.toolA * 10}%` }}
                          />
                        </div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                          {fc.toolA}/10
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-accent-500 h-2 rounded-full"
                            style={{ width: `${fc.toolB * 10}%` }}
                          />
                        </div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                          {fc.toolB}/10
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Pricing Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[toolA, toolB].map((tool) => (
              <div
                key={tool.slug}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="bg-gray-50 dark:bg-gray-700 p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {tool.name} Pricing
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {tool.pricing.map((tier) => (
                    <div
                      key={tier.tier}
                      className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <span className="font-medium text-sm">{tier.tier}</span>
                      <span className="font-bold text-primary-600 dark:text-primary-300">
                        {tier.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-12 bg-primary-50 dark:bg-gray-800 rounded-xl p-6 border border-primary-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Our Verdict
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {comparison.verdict}
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href={toolA.affiliateUrl}
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors"
              rel="nofollow noopener"
            >
              Try {toolA.name}
            </a>
            <a
              href={toolB.affiliateUrl}
              className="px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-lg transition-colors"
              rel="nofollow noopener"
            >
              Try {toolB.name}
            </a>
          </div>
        </section>

        {/* Other comparisons */}
        {uniqueOther.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Related Comparisons
            </h2>
            <div className="flex flex-wrap gap-2">
              {uniqueOther.map((c) => {
                const a = getToolBySlug(c.toolA);
                const b = getToolBySlug(c.toolB);
                return (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}`}
                    className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:border-primary-300 transition-colors"
                  >
                    {a?.name} vs {b?.name}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <FAQ items={faqItems} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${toolA.name} vs ${toolB.name}`,
            description: comparison.verdict,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
