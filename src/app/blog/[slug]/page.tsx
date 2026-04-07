import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import postsData from '../../../../data/posts.json';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

const posts: Post[] = postsData;

function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const canonical = `https://bestformy.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: 'article',
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="text-sm text-accent-500 hover:text-accent-600 font-medium mb-8 inline-block"
        >
          &larr; Back to Blog
        </Link>

        <header className="mb-10">
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="text-4xl font-bold mt-2">{post.title}</h1>
        </header>

        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-semibold
            prose-a:text-accent-500 prose-a:no-underline hover:prose-a:underline
            prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700
            prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-3 prose-th:text-left
            prose-td:p-3 prose-td:border-t prose-td:border-gray-200 dark:prose-td:border-gray-700
            prose-li:marker:text-accent-500"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Related Categories</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/best/crm/for/landscaping"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm hover:border-accent-500 transition-colors"
            >
              Best CRM for Landscaping
            </Link>
            <Link
              href="/best/crm/for/plumbing"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm hover:border-accent-500 transition-colors"
            >
              Best CRM for Plumbing
            </Link>
            <Link
              href="/best/crm/for/hvac"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm hover:border-accent-500 transition-colors"
            >
              Best CRM for HVAC
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
