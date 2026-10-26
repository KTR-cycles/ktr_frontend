import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';
import { getCategories } from '@/lib/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ktrcycleworld.com';
  const lastModDate = new Date('2026-10-26T00:00:00.000Z');

  const products = getProducts();
  const categories = getCategories();
  const seenUrls = new Set<string>();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: lastModDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: lastModDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastModDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: lastModDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: lastModDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  staticUrls.forEach((s) => seenUrls.add(s.url));

  const categoryUrls: MetadataRoute.Sitemap = categories
    .filter((cat) => cat.slug || cat.category_id)
    .map((cat) => ({
      url: `${baseUrl}/category/${cat.slug || cat.category_id}`,
      lastModified: lastModDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
    .filter((item) => {
      if (seenUrls.has(item.url)) return false;
      seenUrls.add(item.url);
      return true;
    });

  const productUrls: MetadataRoute.Sitemap = products
    .filter((product) => Boolean(product.slug))
    .map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: lastModDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
    .filter((item) => {
      if (seenUrls.has(item.url)) return false;
      seenUrls.add(item.url);
      return true;
    });

  return [...staticUrls, ...categoryUrls, ...productUrls];
}
