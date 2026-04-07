import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, industries, getCategoryBySlug } from '@/lib/data';

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};

  const title = `Best ${category.name} Software for Every Industry | BestForMy`;
  const description = `Explore the best ${category.name} software for every industry. Browse ${industries.length} industry-specific guides, comparisons, and recommendations for ${category.name.toLowerCase()} tools.`;
  const canonical = `https://bestformy.com/best/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function CategoryHubPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600">
            Home
          </Link>{' '}
          / <span>{category.name}</span>
        </nav>

        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Best {category.name} Software for Every Industry
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-3xl">
            Browse industry-specific {category.name.toLowerCase()} recommendations
            for all the businesses we cover. Choose your industry to compare the
            top tools, pricing, and features side by side.
          </p>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl">
            We currently have {industries.length} tailored guides for {category.name.toLowerCase()} software,
            from home services and healthcare to finance, legal, and professional services.
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Browse by Industry
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Pick an industry to see the best {category.name.toLowerCase()} tools for that market.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-gray-700">
              {industries.length} industries
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/best/${category.slug}/for/${industry.slug}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-primary-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                    {industry.name}
                  </h3>
                  <span className="text-primary-600 dark:text-primary-300 text-sm font-medium whitespace-nowrap">
                    View →
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  Best {category.name} software for {industry.name.toLowerCase()} businesses.
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `Best ${category.name} Software for Every Industry`,
            description: `Browse ${industries.length} industry-specific guides for ${category.name} software.`,
            url: `https://bestformy.com/best/${category.slug}`,
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: industries.length,
              itemListElement: industries.map((industry, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://bestformy.com/best/${category.slug}/for/${industry.slug}`,
                name: `Best ${category.name} Software for ${industry.name}`,
              })),
            },
          }),
        }}
      />
    </>
  );
}
