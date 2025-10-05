import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand?: string;
  image: string;
  originalPrice: number;
  discount?: number;
  discountedPrice: number;
  categoryName?: string;
}

interface FeaturedProductsProps {
  products: Product[];
  onViewDetails?: (id: string) => void;
  onViewAll?: () => void;
}

export default function FeaturedProducts({
  products,
  onViewDetails,
  onViewAll,
}: FeaturedProductsProps) {
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
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ProductCard {...product} onViewDetails={onViewDetails} />
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
            onClick={onViewAll}
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
