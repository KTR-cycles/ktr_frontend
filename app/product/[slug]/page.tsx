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

  const title = product.meta_title || `${product.name} | Best Price in Tirunelveli | KTR Cycle World`;
  const description = product.meta_description || product.short_description || product.description || `Buy ${product.name} at KTR Cycle World, Tirunelveli, Vannarpettai. Premium quality and best price guaranteed.`;
  const imageUrl = product.image ? `https://ktrcycleworld.com${product.image}` : 'https://ktrcycleworld.com/assets/generated_images/ktr_cycle_logo.jpg';
  const canonicalUrl = `https://ktrcycleworld.com/product/${product.slug || product.id}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.brand,
      product.category_name || 'Bicycle',
      'KTR Cycle World',
      'cycles in Tirunelveli',
      'buy cycle Tirunelveli',
      'Vannarpettai cycle shop',
      'Palayankottai cycles',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'KTR Cycle World',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: `${product.name} at KTR Cycle World Tirunelveli`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const currentPrice = product.discounted_price || product.original_price || 0;
  const imageUrl = product.image ? `https://ktrcycleworld.com${product.image}` : 'https://ktrcycleworld.com/assets/generated_images/ktr_cycle_logo.jpg';

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [imageUrl],
    "description": product.short_description || product.description || product.name,
    "sku": product.id || product.product_id,
    "mpn": product.product_id || product.id,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "KTR"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://ktrcycleworld.com/product/${product.slug || product.id}`,
      "priceCurrency": "INR",
      "price": currentPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "KTR Cycle World"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ktrcycleworld.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://ktrcycleworld.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://ktrcycleworld.com/product/${product.slug || product.id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
