import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About BestForMy',
  description:
    'Learn about BestForMy — our mission is to help businesses find the perfect software tools through honest, data-driven reviews and comparisons.',
  alternates: { canonical: 'https://bestformy.com/about' },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-primary-600">
          Home
        </Link>{' '}
        / <span>About</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
        About BestForMy
      </h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          BestForMy helps small and mid-size businesses find the right software
          tools. We believe every business deserves access to honest,
          data-driven software recommendations — without the noise of paid
          placements or biased reviews.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Choosing business software is hard. There are thousands of tools, each
          claiming to be the best. We cut through the noise by providing
          structured, side-by-side comparisons, detailed reviews, and
          industry-specific recommendations so you can make an informed decision
          in minutes, not weeks.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          How We Review
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Every tool on BestForMy is evaluated across multiple dimensions
          including features, pricing, ease of use, customer support, and
          industry fit. We combine hands-on testing, user feedback analysis, and
          expert evaluation to produce scores that reflect real-world
          performance.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Affiliate Disclosure
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Some links on BestForMy are affiliate links. This means we may earn a
          small commission if you purchase through our links, at no extra cost to
          you. This helps us keep the site running and our reviews independent.
          Our recommendations are never influenced by affiliate relationships.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Have questions, feedback, or want to suggest a tool for review? Reach
          out to us at{' '}
          <span className="text-primary-600 dark:text-primary-300 font-medium">
            hello@bestformy.com
          </span>
          .
        </p>
      </div>
    </div>
  );
}
