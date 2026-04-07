import type { Metadata } from 'next';
import Link from 'next/link';
import postsData from '../../../data/posts.json';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Expert guides, tips, and comparisons to help you find the best software for your business.',
  alternates: {
    canonical: 'https://bestformy.com/blog',
  },
  openGraph: {
    title: 'Blog',
    description:
      'Expert guides, tips, and comparisons to help you find the best software for your business.',
    url: 'https://bestformy.com/blog',
  },
};

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function BlogIndex() {
  const posts: Post[] = postsData;

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Expert guides and comparisons to help you pick the right software.
        </p>

        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h2 className="text-2xl font-semibold mt-1 mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-accent-500 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-accent-500 hover:text-accent-600 font-medium text-sm"
              >
                Read More &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
