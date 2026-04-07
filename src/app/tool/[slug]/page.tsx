import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  tools,
  getToolBySlug,
  getToolsByCategory,
  getComparisonsForTool,
  getCategoryBySlug,
  industries,
} from '@/lib/data';
import ScoreBadge from '@/components/ScoreBadge';
import FAQ from '@/components/FAQ';
import type { FAQItem } from '@/components/FAQ';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  const title = `${tool.name} Review 2026: Pricing, Features & Alternatives`;
  const description = `In-depth ${tool.name} review. See pricing tiers, key features, pros & cons, and the best alternatives for 2026.`;
  const canonical = `https://bestformy.com/tool/${tool.slug}`;
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: { title, description, url: canonical },
    twitter: { title, description },
  };
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const alternatives = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  const relatedComparisons = getComparisonsForTool(tool.slug);

  const faqItems: FAQItem[] = [
    {
      question: `Is ${tool.name} worth it in 2026?`,
      answer: `With a score of ${tool.score.toFixed(1)}/10, ${tool.name} is ${tool.score >= 8.5 ? 'one of the top-rated' : 'a solid'} ${category?.name || ''} tools available. ${tool.pros[0]} is often cited as its biggest strength.`,
    },
    {
      question: `How much does ${tool.name} cost?`,
      answer: `${tool.name} pricing starts at ${tool.pricing[0].price}. They offer ${tool.pricing.length} pricing tiers: ${tool.pricing.map((p) => `${p.tier} (${p.price})`).join(', ')}.`,
    },
    {
      question: `What are the best alternatives to ${tool.name}?`,
      answer: `Top alternatives to ${tool.name} include ${alternatives.map((a) => a.name).join(', ')}. Each offers different strengths depending on your needs and budget.`,
    },
    {
      question: `Does ${tool.name} offer a free plan?`,
      answer:
        tool.pricing[0].price === '$0/mo'
          ? `Yes, ${tool.name} offers a free plan with features including ${tool.pricing[0].features.slice(0, 3).join(', ')}.`
          : `${tool.name} does not offer a free plan. Their most affordable option is the ${tool.pricing[0].tier} plan at ${tool.pricing[0].price}.`,
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600">
            Home
          </Link>{' '}
          /{' '}
          {category && (
            <>
              <Link
                href={`/best/${category.slug}/for/landscaping`}
                className="hover:text-primary-600"
              >
                {category.name}
              </Link>{' '}
              /{' '}
            </>
          )}
          <span>{tool.name}</span>
        </nav>

        {/* Hero */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary-50 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-primary-600 dark:text-primary-300">
                {tool.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                  {tool.name} Review 2026
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Pricing, Features & Alternatives
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ScoreBadge score={tool.score} />
              <a
                href={tool.affiliateUrl}
                className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors"
                rel="nofollow noopener"
              >
                Visit {tool.name}
              </a>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg max-w-3xl">
            {tool.description}
          </p>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 text-sm"
                  >
                    <span className="text-accent-500 font-bold">&#10003;</span>
                    {f}
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Pricing Plans
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tool.pricing.map((tier) => (
                  <div
                    key={tier.tier}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {tier.tier}
                    </h3>
                    <p className="text-2xl font-extrabold text-primary-600 dark:text-primary-300 mt-1">
                      {tier.price}
                    </p>
                    <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5">
                          <span className="text-green-500 mt-0.5">&#10003;</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Pros & Cons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
                  <h3 className="font-bold text-green-800 dark:text-green-300 mb-3">
                    Pros
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {tool.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-0.5">+</span>
                        <span className="text-green-900 dark:text-green-200">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800">
                  <h3 className="font-bold text-red-800 dark:text-red-300 mb-3">
                    Cons
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {tool.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold mt-0.5">-</span>
                        <span className="text-red-900 dark:text-red-200">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Best For */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                Best For
              </h3>
              <div className="flex flex-wrap gap-2">
                {industries.slice(0, 5).map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/best/${tool.category}/for/${ind.slug}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs hover:bg-primary-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    {ind.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Comparisons */}
            {relatedComparisons.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                  Compare {tool.name}
                </h3>
                <div className="space-y-2">
                  {relatedComparisons.map((comp) => {
                    const other = getToolBySlug(
                      comp.toolA === tool.slug ? comp.toolB : comp.toolA
                    );
                    return (
                      <Link
                        key={comp.slug}
                        href={`/compare/${comp.slug}`}
                        className="block text-sm text-primary-600 dark:text-primary-300 hover:underline"
                      >
                        {tool.name} vs {other?.name} &rarr;
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Alternatives */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                Alternatives
              </h3>
              <div className="space-y-3">
                {alternatives.map((alt) => (
                  <Link
                    key={alt.slug}
                    href={`/tool/${alt.slug}`}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-300">
                      {alt.name}
                    </span>
                    <ScoreBadge score={alt.score} />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <FAQ items={faqItems} />
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            url: `https://bestformy.com/tool/${tool.slug}`,
            description: tool.description,
            applicationCategory: category?.name,
            brand: {
              '@type': 'Brand',
              name: tool.name,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: tool.score,
              bestRating: 10,
              worstRating: 0,
              ratingCount: 100,
              reviewCount: 24,
            },
            offers: tool.pricing.map((tier) => ({
              '@type': 'Offer',
              name: tier.tier,
              price: tier.price,
              priceCurrency: 'USD',
              url: `https://bestformy.com/tool/${tool.slug}`,
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
