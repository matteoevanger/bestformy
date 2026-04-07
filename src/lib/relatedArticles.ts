import postsData from '../../data/posts.json';
import { tools } from '@/lib/data';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

const posts: Post[] = postsData as Post[];

function normalize(value: string): string {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
}

function includesTerm(haystack: string, term: string): boolean {
  if (!term) return false;
  return normalize(haystack).includes(normalize(term));
}

function getCategoryToolSlugs(categorySlug: string): string[] {
  return tools.filter((tool) => tool.category === categorySlug).map((tool) => tool.slug);
}

function scorePostForCategory(post: Post, categorySlug: string, industrySlug?: string): number {
  const searchable = [post.slug, post.title, post.excerpt, post.content].join(' ');
  const categoryToolSlugs = getCategoryToolSlugs(categorySlug);
  let score = 0;

  if (post.content.includes(`/best/${categorySlug}`)) score += 5;
  if (post.content.includes(`/best/${categorySlug}/for/`)) score += 3;

  if (includesTerm(searchable, categorySlug)) score += 4;

  const categoryName = categorySlug.replace(/-/g, ' ');
  if (includesTerm(searchable, categoryName)) score += 3;

  for (const toolSlug of categoryToolSlugs) {
    const toolPath = `/tool/${toolSlug}`;
    if (post.content.includes(toolPath)) score += 2;
    if (includesTerm(searchable, toolSlug)) score += 1;
  }

  if (industrySlug) {
    if (post.content.includes(`/best/${categorySlug}/for/${industrySlug}`)) score += 8;
    if (includesTerm(searchable, industrySlug)) score += 4;

    const industryName = industrySlug.replace(/-/g, ' ');
    if (includesTerm(searchable, industryName)) score += 3;
  }

  return score;
}

export function getRelatedArticles(categorySlug: string, industrySlug?: string, limit = 3): RelatedArticle[] {
  return posts
    .map((post) => ({ post, score: scorePostForCategory(post, categorySlug, industrySlug) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map(({ post }) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
    }));
}
