import productsData from '../data/products.json';
import type { Product } from '../types';

export function getProducts(): Product[] {
  return productsData as unknown as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(
    (p) => p.slug === slug || p.id === slug || p.product_id === slug
  );
}

export function getProductById(id: string): Product | undefined {
  const products = getProducts();
  return products.find((p) => p.id === id || p.product_id === id || p.slug === id);
}

export function getFeaturedProducts(): Product[] {
  const products = getProducts();
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(categoryIdentifier: string): Product[] {
  const products = getProducts();
  return products.filter(
    (p) =>
      p.category === categoryIdentifier ||
      p.category_id === categoryIdentifier ||
      p.category_name?.toLowerCase() === categoryIdentifier.toLowerCase()
  );
}
