import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { getCategories, getCategoryBySlug } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  const paths: { slug: string }[] = [];

  categories.forEach((cat) => {
    if (cat.slug) paths.push({ slug: cat.slug });
    if (cat.category_id && cat.category_id !== cat.slug) paths.push({ slug: cat.category_id });
  });

  return paths;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return { title: 'Category Not Found' };
  }

  const title = `${category.name} | Best ${category.name} in Tirunelveli | KTR Cycle World`;
  const description = category.description || `Browse top quality ${category.name} collection at KTR Cycle World, Tirunelveli, Vannarpettai & Palayankottai. Best prices guaranteed.`;
  const canonicalUrl = `https://ktrcycleworld.com/category/${category.slug || category.category_id}`;

  return {
    title,
    description,
    keywords: [
      category.name,
      `${category.name} Tirunelveli`,
      `${category.name} Vannarpettai`,
      `${category.name} Palayankottai`,
      'KTR Cycle World',
      'buy cycles Tirunelveli',
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
          url: category.image ? `https://ktrcycleworld.com${category.image}` : 'https://ktrcycleworld.com/assets/generated_images/ktr_cycle_logo.jpg',
          width: 800,
          height: 600,
          alt: category.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.category_id);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name,
    "description": category.description || `Browse ${category.name} collection at KTR Cycle World Tirunelveli`,
    "url": `https://ktrcycleworld.com/category/${category.slug || category.category_id}`,
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
        "name": category.name,
        "item": `https://ktrcycleworld.com/category/${category.slug || category.category_id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="py-12 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {category.name} <span className="text-primary">Collection</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              {category.description || `Explore our high quality ${category.name} range in Tirunelveli.`}
            </p>
          </div>

          {categoryProducts.length === 0 ? (
            <div className="text-center py-16 bg-accent/10 rounded-2xl border border-border">
              <h3 className="text-xl font-semibold mb-2">No cycles found in this category</h3>
              <p className="text-muted-foreground">Check back soon for new arrivals!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  brand={product.brand}
                  images={product.image || product.images}
                  originalPrice={product.original_price}
                  discountedPrice={product.discounted_price}
                  categoryName={product.category_name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
