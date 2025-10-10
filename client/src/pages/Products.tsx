import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import SkeletonCard from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { fetchProducts } from "@/lib/api";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSelectedProduct } from "@/store/productDetailSlice";
import type { Product, Category } from "../types";
import { getFirstImageUrl } from "@/utils/imageUtils";
import { PATHS } from "@/components/path";

export default function Products() {
  const [, setLocation] = useLocation();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10000, 100000]);
  const [displayCount, setDisplayCount] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['/api/products'],
    queryFn: fetchProducts,
  });

  const brands = Array.from(new Set((products || []).map(p => p.brand).filter(Boolean))) as string[];
  const categoryDetails = categories?.length > 0
    ? categories.map((c: Category) => ({id: c.category_id, name: c.name}))
    : [];
  const minPrice = (products || []).length > 0 ? Math.min(...(products || []).map(p => p.discounted_price)) : 10000;
  const maxPrice = (products || []).length > 0 ? Math.max(...(products || []).map(p => p.discounted_price)) : 100000;

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const filterOptions = {
    categories: categoryDetails,
    brands: brands,
    priceRange: [minPrice, maxPrice] as [number, number],
  };

  const filteredProducts = (products || []).filter((product) => {
    // selectedCategories already contains category IDs (e.g., "cat_002")
    const categoryMatch =
      selectedCategories.length === 0 || 
      (product.category && selectedCategories.includes(product.category)) ||
      (product.category_id && selectedCategories.includes(product.category_id));
    
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand || '');
    const priceMatch =
      product.discounted_price >= priceRange[0] && product.discounted_price <= priceRange[1];
    const searchMatch =
      searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && brandMatch && priceMatch && searchMatch;
  });

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
    setSearchQuery("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3">
                  Our <span className="text-primary">Cycle Collection</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                  Loading cycles...
                </p>
              </div>
              
              {/* Search Bar Skeleton */}
              <div className="relative max-w-md w-full mx-auto lg:mx-0">
                <div className="h-14 sm:h-16 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Filter Skeleton */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Categories Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-3 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Brands Section */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-3 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="border-t border-border pt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-3 pl-2">
                      <div className="h-2 w-full bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex items-center justify-between">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid Skeleton */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <SkeletonCard key={index} />
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
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div className="text-center">
          <p className="text-lg sm:text-xl text-muted-foreground mb-3 sm:mb-4">Failed to load products</p>
          <Button onClick={() => window.location.reload()} variant="default" className="rounded-full text-sm sm:text-base">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3">
                Our <span className="text-primary">Cycle Collection</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Showing {displayedProducts.length} of {filteredProducts.length} cycles
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md w-full mx-auto lg:mx-0">
              <Input
                type="text"
                placeholder="Search for cycles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-6 py-5 sm:py-6 rounded-full border-border/50 bg-white/80 shadow-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base h-14 sm:h-16 text-center"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 hidden lg:block"
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
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
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
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
              {displayedProducts.map((product, index) => {
                const firstImage = getFirstImageUrl(product.images || '');
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
                      images={firstImage}
                      originalPrice={product.original_price}
                      discount={product.discount}
                      discountedPrice={product.discounted_price}
                      categoryName={product.category_name}
                      onViewDetails={(id) => {
                        dispatch(setSelectedProduct(product));
                        setLocation(PATHS.PRODUCT_DETAIL);
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  {searchQuery ? `No cycles found matching "${searchQuery}"` : "No cycles found matching your filters"}
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