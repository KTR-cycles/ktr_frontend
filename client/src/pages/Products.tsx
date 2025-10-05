import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import bikeImage from '@assets/generated_images/Premium_golden_bike_product_18205e52.png';

export default function Products() {
  const [, setLocation] = useLocation();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10000, 100000]);
  const [displayCount, setDisplayCount] = useState(9);

  const filterOptions = {
    categories: ['Mountain Bike', 'Road Bike', 'City Bike', 'Electric Bike', 'Kids Bike'],
    brands: ['KTR Sports', 'KTR Urban', 'KTR Performance', 'KTR Electric', 'KTR Junior'],
    priceRange: [10000, 100000] as [number, number],
  };

  const allProducts = [
    {
      id: "1",
      name: "Mountain Explorer Pro 29",
      brand: "KTR Sports",
      image: bikeImage,
      actualPrice: 45000,
      discount: 20,
      currentPrice: 36000,
      category: "Mountain Bike"
    },
    {
      id: "2",
      name: "City Cruiser Elite",
      brand: "KTR Urban",
      image: bikeImage,
      actualPrice: 28000,
      discount: 15,
      currentPrice: 23800,
      category: "City Bike"
    },
    {
      id: "3",
      name: "Road Racer X1",
      brand: "KTR Performance",
      image: bikeImage,
      actualPrice: 55000,
      discount: 10,
      currentPrice: 49500,
      category: "Road Bike"
    },
    {
      id: "4",
      name: "Electric Glide 500",
      brand: "KTR Electric",
      image: bikeImage,
      actualPrice: 75000,
      discount: 12,
      currentPrice: 66000,
      category: "Electric Bike"
    },
    {
      id: "5",
      name: "Mountain Trail Master",
      brand: "KTR Sports",
      image: bikeImage,
      actualPrice: 52000,
      discount: 18,
      currentPrice: 42640,
      category: "Mountain Bike"
    },
    {
      id: "6",
      name: "Urban Commuter Plus",
      brand: "KTR Urban",
      image: bikeImage,
      actualPrice: 32000,
      discount: 10,
      currentPrice: 28800,
      category: "City Bike"
    },
    {
      id: "7",
      name: "Junior Adventure 24",
      brand: "KTR Junior",
      image: bikeImage,
      actualPrice: 18000,
      discount: 15,
      currentPrice: 15300,
      category: "Kids Bike"
    },
    {
      id: "8",
      name: "Performance Road Pro",
      brand: "KTR Performance",
      image: bikeImage,
      actualPrice: 68000,
      discount: 8,
      currentPrice: 62560,
      category: "Road Bike"
    },
    {
      id: "9",
      name: "Electric Turbo 750",
      brand: "KTR Electric",
      image: bikeImage,
      actualPrice: 95000,
      discount: 10,
      currentPrice: 85500,
      category: "Electric Bike"
    },
    {
      id: "10",
      name: "City Explorer Lite",
      brand: "KTR Urban",
      image: bikeImage,
      actualPrice: 24000,
      discount: 12,
      currentPrice: 21120,
      category: "City Bike"
    },
    {
      id: "11",
      name: "Mountain Beast 27.5",
      brand: "KTR Sports",
      image: bikeImage,
      actualPrice: 48000,
      discount: 15,
      currentPrice: 40800,
      category: "Mountain Bike"
    },
    {
      id: "12",
      name: "Junior Racer 20",
      brand: "KTR Junior",
      image: bikeImage,
      actualPrice: 15000,
      discount: 10,
      currentPrice: 13500,
      category: "Kids Bike"
    },
  ];

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(product.category!);
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand!);
    const priceMatch =
      product.currentPrice >= priceRange[0] && product.currentPrice <= priceRange[1];
    return categoryMatch && brandMatch && priceMatch;
  });

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([10000, 100000]);
  };

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
              {displayedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                >
                  <ProductCard
                    {...product}
                    onViewDetails={(id) => setLocation(`/products/${id}`)}
                  />
                </motion.div>
              ))}
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
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" style={{ display: 'none' }} />
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
