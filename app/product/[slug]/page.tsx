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
    if (Array.isArray((product as any).legacy_slugs)) {
      (product as any).legacy_slugs.forEach((s: string) => s && paramsSet.add(s));
    }
  });
  return Array.from(paramsSet).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://www.ktrcycleworld.com';

  // Use structured SEO fields; fall back to legacy / raw fields
  const seo     = (product as any).seo;
  const ogData  = (product as any).og;
  const twData  = (product as any).twitter;

  const title       = seo?.title || (product as any).seo_title || `${product.name} | KTR Cycle World`;
  const description = seo?.description || (product as any).seo_description || product.short_description || product.description || `Buy ${product.name} at KTR Cycle World, Tirunelveli.`;
  const keywords    = seo?.keywords ?? [product.name, product.brand, product.category_name, 'KTR Cycle World', `cycles in Tirunelveli`].filter(Boolean);
  const canonical   = `${BASE_URL}/product/${product.slug || product.id}`;

  const rawImage =
    ogData?.image ||
    (Array.isArray(product.images) && product.images[0]) ||
    (product as any).images_list?.[0] ||
    product.image ||
    '';
  const imageUrl = rawImage.startsWith('http')
    ? rawImage
    : rawImage
    ? `${BASE_URL}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`
    : `${BASE_URL}/assets/generated_images/ktr_cycle_logo.jpg`;

  const ogTitle = ogData?.title || title;
  const ogDesc  = ogData?.description || description;
  const ogUrl   = canonical;

  const twTitle = twData?.title || ogTitle;
  const twDesc  = twData?.description || ogDesc;
  const twImg   = twData?.image ? (twData.image.startsWith('http') ? twData.image : `${BASE_URL}${twData.image.startsWith('/') ? twData.image : `/${twData.image}`}`) : imageUrl;

  return {
    title,
    description,
    keywords,
    robots: seo?.robots ?? 'index,follow',
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: ogUrl,
      siteName: ogData?.site_name ?? 'KTR Cycle World',
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
      card: twData?.card ?? 'summary_large_image',
      title: twTitle,
      description: twDesc,
      images: [twImg],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://www.ktrcycleworld.com';
  const currentPrice = product.discounted_price || product.original_price || 0;
  
  const rawProductImage =
    (Array.isArray(product.images) && product.images[0]) ||
    (product as any).images_list?.[0] ||
    product.image ||
    '';
  const productImageUrl = rawProductImage.startsWith('http')
    ? rawProductImage
    : rawProductImage
    ? `${BASE_URL}${rawProductImage.startsWith('/') ? rawProductImage : `/${rawProductImage}`}`
    : `${BASE_URL}/assets/generated_images/ktr_cycle_logo.jpg`;

  const inStock = currentPrice > 0 && (product as any).stock !== false && (product as any).stock !== 0;
  const availability = inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";

  const productSchema: Record<string, any> = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [productImageUrl],
    "description": product.short_description || product.description || product.name,
    "sku": product.id || product.product_id,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "KTR"
    },
    "offers": {
      "@type": "Offer",
      "url": `${BASE_URL}/product/${product.slug || product.id}`,
      "priceCurrency": "INR",
      "price": currentPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": availability,
      "seller": {
        "@type": "Organization",
        "name": "KTR Cycle World",
        "url": BASE_URL
      }
    }
  };

  // Only assign mpn if a genuine manufacturer part number exists
  if ((product as any).mpn) {
    productSchema.mpn = (product as any).mpn;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${BASE_URL}/products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `${BASE_URL}/product/${product.slug || product.id}`
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
