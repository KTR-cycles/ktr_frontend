import categoriesData from '../data/categories.json';
import type { Category } from '../types';

export function getCategories(): Category[] {
  return categoriesData as unknown as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const categories = getCategories();
  return categories.find(
    (c) => c.slug === slug || c.category_id === slug || c.id === slug
  );
}
