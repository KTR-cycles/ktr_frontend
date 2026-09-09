"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";

function ProductCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const categoryFromUrl = searchParams.get('category');
  
  const products = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [displayCount, setDisplayCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand).filter(Boolean))) as string[];
  }, [products]);

  const minPrice = useMemo(() => {
    return products.length > 0 ? Math.min(...products.map((p) => p.discounted_price)) : 0;
  }, [products]);

  const maxPrice = useMemo(() => {
    return products.length > 0 ? Math.max(...products.map((p) => p.discounted_price)) : 100000;
  }, [products]);

  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
    }
  }, [categoryFromUrl]);

  const categoryDetails = useMemo(() => {
    return categories.map((c) => ({ id: c.category_id, name: c.name }));
  }, [categories]);

  const filterOptions = {
    categories: categoryDetails,
    brands: brands,
    priceRange: [minPrice, maxPrice] as [number, number],
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category) ||
        selectedCategories.includes(product.category_id || '') ||
        selectedCategories.includes(product.category_name || '');

      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand || '');

      const priceMatch =
        product.discounted_price >= priceRange[0] &&
        product.discounted_price <= priceRange[1];

      const searchMatch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category_name &&
          product.category_name.toLowerCase().includes(searchQuery.toLowerCase()));

      return categoryMatch && brandMatch && priceMatch && searchMatch;
    });
  }, [products, selectedCategories, selectedBrands, priceRange, searchQuery]);

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
    setSearchQuery("");
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Cycles</span> Catalog
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-6">
            Browse through our wide collection of premium cycles in Tirunelveli
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search cycles by name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
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

          <div className="flex-1 w-full">
            <div className="mb-6 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Showing {Math.min(filteredProducts.length, displayCount)} of {filteredProducts.length} cycles
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-accent/10 rounded-2xl border border-border">
                <h3 className="text-xl font-semibold mb-2">No cycles match your search filters</h3>
                <p className="text-muted-foreground mb-6">Try clearing some filters or changing your search phrase.</p>
                <Button onClick={handleClearFilters} variant="outline" className="rounded-full">
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-12">
                  {filteredProducts.slice(0, displayCount).map((product) => (
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
                      onViewDetails={(target) => router.push(`/product/${target}`)}
                    />
                  ))}
                </div>

                {displayCount < filteredProducts.length && (
                  <div className="text-center mt-8">
                    <Button
                      onClick={() => setDisplayCount((prev) => prev + 12)}
                      variant="outline"
                      className="rounded-full px-8 py-6"
                    >
                      Load More Cycles
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading catalog...</div>}>
      <ProductCatalogContent />
    </Suspense>
  );
}
