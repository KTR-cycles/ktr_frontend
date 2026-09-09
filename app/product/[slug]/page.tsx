import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import { getProducts, getProductBySlug } from '@/lib/products';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  const paramsSet = new Set<string>();
  products.forEach((product) => {
    if (product.slug) paramsSet.add(product.slug);
    if (product.id) paramsSet.add(product.id);
    if (product.product_id) paramsSet.add(product.product_id);
  });
  return Array.from(paramsSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = `${product.name} | Best Price in Tirunelveli | KTR Cycle World`;
  const description = product.short_description || product.description || `Buy ${product.name} at KTR Cycle World, Tirunelveli, Vannarpettai. Premium quality and best price guaranteed.`;
  const imageUrl = product.image ? `https://ktrcycleworld.com${product.image}` : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
