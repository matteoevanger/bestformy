import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  categories,
  industries,
  getCategoryBySlug,
  getIndustryBySlug,
  getTopToolsForCategory,
  comparisons,
  tools,
} from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import FAQ from '@/components/FAQ';
import type { FAQItem } from '@/components/FAQ';
import ScoreBadge from '@/components/ScoreBadge';

interface Props {
  params: { category: string; industry: string };
}

export function generateStaticParams() {
  const params: { category: string; industry: string }[] = [];
  for (const cat of categories) {
    for (const ind of industries) {
      params.push({ category: cat.slug, industry: ind.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.category);
  const industry = getIndustryBySlug(params.industry);
  if (!category || !industry) return {};
  const title = `Best ${category.name} Software for ${industry.name} in 2026`;
  const description = `Compare the top ${category.name} tools for ${industry.name} businesses. Expert reviews, pricing, and feature comparisons to help you choose.`;
  return {
    title,
    description,
    alternates: {
      canonical: `https://bestformy.com/best/${category.slug}/for/${industry.slug}`,
    },
    openGraph: { title, description },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);
  const industry = getIndustryBySlug(params.industry);
  if (!category || !industry) notFound();

  const topTools = getTopToolsForCategory(category.slug);

  const faqItems: FAQItem[] = [
    {
      question: `What is the best ${category.name} software for ${industry.name}?`,
      answer: `Based on our analysis, ${topTools[0]?.name} is the top-rated ${category.name} tool for ${industry.name} businesses in 2026, scoring ${topTools[0]?.score.toFixed(1)}/10. However, the best choice depends on your specific needs, team size, and budget.`,
    },
    {
      question: `How much does ${category.name} software cost for ${industry.name} businesses?`,
      answer: `${category.name} software pricing varies widely. Free tiers are available from some providers, while premium plans range from $10 to $300+ per month. Most ${industry.name} businesses find a good fit in the $15-$50/month range.`,
    },
    {
      question: `Do ${industry.name} businesses need specialized ${category.name} software?`,
      answer: `While general ${category.name} tools work for most ${industry.name} businesses, industry-specific features like job scheduling, field service management, and industry-specific templates can improve efficiency significantly.`,
    },
    {
      question: `Can I switch ${category.name} tools later?`,
      answer: `Yes, most modern ${category.name} tools support data import/export. However, switching costs time, so it's worth evaluating your options carefully before committing.`,
    },
  ];

  const relatedComparisons = comparisons.filter((c) => {
    const toolA = tools.find((t) => t.slug === c.toolA);
    const toolB = tools.find((t) => t.slug === c.toolB);
    return toolA?.category === category.slug || toolB?.category === category.slug;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600">
            Home
          </Link>{' '}
          / <span>{category.name}</span> /{' '}
          <span>{industry.name}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Best {category.name} Software for {industry.name} in 2026
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
          We analyzed and compared the top {category.name} tools to find the
          best options for {industry.name} businesses. Here are our top picks
          based on features, pricing, ease of use, and value.
        </p>

        {/* Top Picks */}
        <section className="space-y-6 mb-12">
          {topTools.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} rank={i + 1} />
          ))}
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="text-left p-4 font-semibold">Tool</th>
                  <th className="text-left p-4 font-semibold">Score</th>
                  <th className="text-left p-4 font-semibold">Starting Price</th>
                  <th className="text-left p-4 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {topTools.map((tool) => (
                  <tr
                    key={tool.slug}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-4">
                      <Link
                        href={`/tool/${tool.slug}`}
                        className="font-semibold text-primary-600 dark:text-primary-300 hover:underline"
                      >
                        {tool.name}
                      </Link>
                    </td>
                    <td className="p-4">
                      <ScoreBadge score={tool.score} />
                    </td>
                    <td className="p-4">{tool.pricing[0].price}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-300">
                      {tool.pros[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Comparisons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedComparisons.map((comp) => {
                const tA = tools.find((t) => t.slug === comp.toolA);
                const tB = tools.find((t) => t.slug === comp.toolB);
                return (
                  <Link
                    key={comp.slug}
                    href={`/compare/${comp.slug}`}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {tA?.name} vs {tB?.name}
                    </span>
                    <span className="text-primary-600 dark:text-primary-300 text-sm ml-2">
                      &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Other Industries */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {category.name} for Other Industries
          </h2>
          <div className="flex flex-wrap gap-2">
            {industries
              .filter((ind) => ind.slug !== industry.slug)
              .map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/best/${category.slug}/for/${ind.slug}`}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:border-primary-300 transition-colors"
                >
                  {category.name} for {ind.name}
                </Link>
              ))}
          </div>
        </section>

        <FAQ items={faqItems} />
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Best ${category.name} for ${industry.name}`,
            itemListElement: topTools.map((tool, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'SoftwareApplication',
                name: tool.name,
                description: tool.description,
                applicationCategory: category.name,
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: tool.score,
                  bestRating: 10,
                  worstRating: 0,
                },
              },
            })),
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
