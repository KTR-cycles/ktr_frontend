import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import type { Product, ProductVariant, Category } from '../types';

const categoryMap = new Map<string, string>(
  (categoriesData as unknown as Category[]).map((c) => [c.category_id || c.id, c.name])
);

export function getProducts(): Product[] {
  return (productsData as unknown as any[]).map((p) => {
    const imagesList = Array.isArray(p.images)
      ? p.images
      : typeof p.images === 'string' && p.images.trim()
      ? p.images.split(',').map((s: string) => s.trim()).filter(Boolean)
      : p.image
      ? [p.image]
      : ['/images/placeholder.png'];

    const firstImage = imagesList[0] || '/images/placeholder.png';
    const catId = p.category_id || p.category || '';
    const catName = p.category_name || categoryMap.get(catId) || '';

    return {
      ...p,
      category_id: catId,
      category: catId,
      category_name: catName,
      images: imagesList,
      images_list: imagesList,
      image: firstImage,
      currentPrice: p.discounted_price,
    } as Product;
  });
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

export function getCycleSizeForProduct(product: Partial<Product>): string {
  if (product.cycle_size && product.cycle_size.trim()) {
    return product.cycle_size.trim();
  }

  const name = (product.name || "").toUpperCase();

  if (name.includes("27.5T") || name.includes("27.5\"") || name.includes("27.5") || name.includes("27T")) return "27.5T";
  if (name.includes("29T") || name.includes("29\"") || name.includes("29 ")) return "29T";
  if (name.includes("26T") || name.includes("26\"") || name.includes(" 26 ") || name.includes("26 FSDD")) return "26T";
  if (name.includes("24T") || name.includes("24\"") || name.includes(" 24 ")) return "24T";
  if (name.includes("20T") || name.includes("20\"") || name.includes(" 20 ")) return "20T";
  if (name.includes("16T") || name.includes("16\"")) return "16T";
  if (name.includes("14T") || name.includes("14\"")) return "14T";
  if (name.includes("12T") || name.includes("12\"")) return "12T";

  if (Array.isArray(product.specifications)) {
    const ws = product.specifications.find(
      (s: any) => s.label && s.label.toLowerCase().includes("wheel size")
    );
    if (ws && typeof ws.value === "string") {
      const v = ws.value.toUpperCase();
      if (v.includes("29")) return "29T";
      if (v.includes("27.5") || v.includes("27")) return "27.5T";
      if (v.includes("26")) return "26T";
      if (v.includes("24")) return "24T";
      if (v.includes("20")) return "20T";
      if (v.includes("16")) return "16T";
      if (v.includes("14")) return "14T";
      if (v.includes("12")) return "12T";
    }
  }

  if (name.includes("SHURVEER")) return "26T";
  if (name.includes("E-SURGE")) return "27.5T";
  if (name.includes("MAMBA") || name.includes("GOST")) return "20T";

  return "Other";
}

export function getCycleSizes(): string[] {
  const products = getProducts();
  const set = new Set<string>();
  products.forEach((p) => {
    const size = getCycleSizeForProduct(p);
    if (size && size !== "Other") set.add(size);
  });
  const order = ["12T", "14T", "16T", "20T", "24T", "26T", "27.5T", "29T"];
  return Array.from(set).sort((a, b) => {
    const idxA = order.indexOf(a);
    const idxB = order.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });
}

export function getProductVariants(product: Product): ProductVariant[] {
  if (product.variants && product.variants.length > 0) {
    return product.variants;
  }

  const allProducts = getProducts();

  // If product has a variant group ID
  if (product.variant_group_id) {
    return allProducts
      .filter((p) => p.variant_group_id === product.variant_group_id)
      .map((p) => ({
        id: p.id,
        product_id: p.product_id,
        slug: p.slug,
        name: p.name,
        varient_label: p.varient_label || p.name,
        color: p.color,
        tire_size: p.tire_size,
        brakes: p.brakes,
        gears: p.gears,
        original_price: p.original_price,
        discounted_price: p.discounted_price,
        image: p.image,
        stock: p.stock
      }));
  }

  return [];
}


