import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';
import { getCategories } from '@/lib/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ktrcycleworld.com';

  const products = getProducts();
  const categories = getCategories();

  const productUrls = products
    .filter((product) => product.slug || product.id)
    .map((product) => ({
      url: `${baseUrl}/product/${product.slug || product.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  const categoryUrls = categories
    .filter((cat) => cat.slug || cat.category_id)
    .map((cat) => ({
      url: `${baseUrl}/category/${cat.slug || cat.category_id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...categoryUrls, ...productUrls];
}
