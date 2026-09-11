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

export function getAgeGroupForProduct(product: Partial<Product>): string {
  if (product.age_group && product.age_group.trim()) {
    return product.age_group.trim();
  }

  const text = (
    (product.name || "") + " " +
    (product.short_description || "") + " " +
    (product.description || "") + " " +
    (product.tags || "") + " " +
    (product.varient_label || "")
  ).toLowerCase();

  if (text.includes("under 5") || text.includes("2 to 5") || text.includes("12t") || text.includes("14t")) {
    return "2-5 Years";
  }
  if (text.includes("under 8") || text.includes("16t") || text.includes("18t")) {
    return "5-8 Years";
  }
  if (text.includes("under 10") || text.includes("7 to 11") || text.includes("20t") || text.includes('20"') || text.includes("20 ")) {
    return "8-12 Years";
  }
  if (text.includes("24t") || text.includes('24"') || text.includes("24 ")) {
    return "12-15 Years";
  }

  return "15+ Years";
}

export function getAgeGroups(): string[] {
  const products = getProducts();
  const set = new Set<string>();
  products.forEach((p) => {
    const age = getAgeGroupForProduct(p);
    if (age) set.add(age);
  });
  const order = ["2-5 Years", "5-8 Years", "8-12 Years", "12-15 Years", "15+ Years"];
  return Array.from(set).sort((a, b) => {
    const idxA = order.indexOf(a);
    const idxB = order.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });
}

