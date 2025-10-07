import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import SkeletonCard from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { fetchProducts } from "@/lib/api";
import { useAppSelector } from "@/store/hooks";
import type { Product } from "../types";

export default function Products() {
  const [, setLocation] = useLocation();
  const categories = useAppSelector((state) => state.categories.items);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10000, 100000]);
  const [displayCount, setDisplayCount] = useState(9);

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['/api/products'],
    queryFn: fetchProducts,
  });

  const brands = Array.from(new Set((products || []).map(p => p.brand).filter(Boolean))) as string[];
  const categoryNames = categories.length > 0
    ? categories.map((c: { name: string }) => c.name)
    : Array.from(new Set((products || []).map(p => p.category_name).filter(Boolean))) as string[];

  const minPrice = (products || []).length > 0 ? Math.min(...(products || []).map(p => p.discounted_price)) : 10000;
  const maxPrice = (products || []).length > 0 ? Math.max(...(products || []).map(p => p.discounted_price)) : 100000;

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const filterOptions = {
    categories: categoryNames,
    brands: brands,
    priceRange: [minPrice, maxPrice] as [number, number],
  };

  const filteredProducts = (products || []).filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(product.category_name || '');
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand || '');
    const priceMatch =
      product.discounted_price >= priceRange[0] && product.discounted_price <= priceRange[1];
    return categoryMatch && brandMatch && priceMatch;
  });

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <div className="h-10 bg-muted rounded-lg w-2/3 mb-3 animate-pulse" />
            <div className="h-6 bg-muted rounded-lg w-1/3 animate-pulse" />
          </div>
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg p-6 h-96 animate-pulse" />
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Failed to load products</p>
          <Button onClick={() => window.location.reload()} variant="default" className="rounded-full">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our <span className="text-primary">Cycle Collection</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Showing {displayedProducts.length} of {filteredProducts.length} cycles
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <ProductFilters
              options={filterOptions}
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategories}
              onBrandChange={setSelectedBrands}
              onPriceChange={setPriceRange}
              onClearAll={handleClearFilters}
            />
          </motion.div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedProducts.map((product, index) => {
                const images = product.images?.split(',').map((img: string) => img.trim()) || [];
                const uniqueKey = product.id || `product-${index}`;
                return (
                  <motion.div
                    key={uniqueKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      brand={product.brand}
                      images={images[0]}
                      originalPrice={product.original_price}
                      discount={product.discount}
                      discountedPrice={product.discounted_price}
                      categoryName={product.category_name}
                      onViewDetails={(id) => setLocation(`/products/${id}`)}
                    />
                  </motion.div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  No cycles found matching your filters
                </p>
                <Button
                  variant="default"
                  onClick={handleClearFilters}
                  className="rounded-full"
                  data-testid="button-clear-filters-empty"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 text-center"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full px-8"
                  onClick={() => setDisplayCount((prev) => prev + 9)}
                  data-testid="button-load-more"
                >
                  Load More Cycles
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
