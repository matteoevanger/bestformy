import toolsData from '../../data/tools.json';
import categoriesData from '../../data/categories.json';
import industriesData from '../../data/industries.json';
import comparisonsData from '../../data/comparisons.json';
import type { Tool, Category, Industry, Comparison } from './types';

export const tools: Tool[] = toolsData as Tool[];
export const categories: Category[] = categoriesData as Category[];
export const industries: Industry[] = industriesData as Industry[];
export const comparisons: Comparison[] = comparisonsData as Comparison[];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((t) => t.category === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getComparisonsForTool(toolSlug: string): Comparison[] {
  return comparisons.filter(
    (c) => c.toolA === toolSlug || c.toolB === toolSlug
  );
}

export function getTopToolsForCategory(
  categorySlug: string,
  limit = 5
): Tool[] {
  return getToolsByCategory(categorySlug)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
