"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getFeaturedProducts } from "@/lib/products";

export default function FeaturedProducts() {
  const router = useRouter();
  const featuredProducts = getFeaturedProducts().slice(0, 6);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-foreground mb-3 sm:mb-4">
            Most <span className="text-primary">Popular</span> Cycles
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4">
            Discover our best-selling cycles loved by riders everywhere
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ProductCard 
                id={product.id}
                slug={product.slug}
                name={product.name}
                brand={product.brand}
                images={product.image || product.images}
                originalPrice={product.original_price}
                discountedPrice={product.discounted_price}
                categoryName={product.category_name}
                onViewDetails={(target) => {
                  router.push(`/product/${target}`);
                }} 
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
            size="default"
            className="rounded-full px-6 sm:px-8 text-sm sm:text-base"
            onClick={() => router.push('/products')}
            data-testid="button-view-all-products"
          >
            View All Products
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
