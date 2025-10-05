import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Product } from "../types";
import { PATHS } from "./path";
import { useLocation } from "wouter";
import bikeImage from '@assets/generated_images/Premium_golden_bike_product_18205e52.png';
import { fetchFeaturedProducts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";



export default function FeaturedProducts() {
  const { PRODUCTS } = PATHS;
  const { data: featuredProducts = [], isLoading, isError } = useQuery({
    queryKey: ['/api/featured-products'],
    queryFn: fetchFeaturedProducts,
  });

  const [, setLocation] = useLocation();


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading featured products</div>;
  }
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Most <span className="text-primary">Popular</span> Cycles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our best-selling cycles loved by riders everywhere
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ProductCard 
                {...product} 
                originalPrice={product.original_price}
                discountedPrice={product.discounted_price}
                categoryName={product.category_name}
                onViewDetails={(id) => setLocation(`/products/${id}`)} 
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button
            variant="default"
            size="lg"
            className="rounded-full px-8"
            onClick={() => setLocation(PRODUCTS)}
            data-testid="button-view-all-products"
          >
            View All Products
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
