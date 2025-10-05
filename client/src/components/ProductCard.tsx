import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  image: string;
  actualPrice: number;
  discount?: number;
  currentPrice: number;
  category?: string;
  onViewDetails?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  brand,
  image,
  actualPrice,
  discount,
  currentPrice,
  category,
  onViewDetails,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg overflow-hidden hover-elevate transition-all"
      data-testid={`product-card-${id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {discount && discount > 0 && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-bold text-sm rounded-full px-3 py-1">
            {discount}% OFF
          </Badge>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Button
            variant="default"
            size="default"
            className="w-full rounded-full"
            onClick={() => onViewDetails?.(id)}
            data-testid={`button-view-details-${id}`}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </motion.div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            {brand && (
              <p className="text-sm text-muted-foreground font-medium mb-1">{brand}</p>
            )}
            <h3 className="text-lg font-semibold text-foreground line-clamp-2" data-testid={`text-product-name-${id}`}>
              {name}
            </h3>
          </div>
          {category && (
            <Badge variant="secondary" className="ml-2 rounded-full">
              {category}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-primary" data-testid={`text-current-price-${id}`}>
            ₹{currentPrice.toLocaleString()}
          </span>
          {discount && discount > 0 && (
            <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${id}`}>
              ₹{actualPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
