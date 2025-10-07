import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ImageOff } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  images: string;
  originalPrice: number;
  discount?: number;
  discountedPrice: number;
  categoryName?: string;
  onViewDetails?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  brand,
  images,
  originalPrice,
  discount,
  discountedPrice,
  categoryName,
  onViewDetails,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const cleanImageUrl = images?.split(',')[0]?.trim() || '';
  const hasValidImage = cleanImageUrl && cleanImageUrl.startsWith('http');
  console.log(cleanImageUrl, hasValidImage)
  // Increased image area height for a more prominent product image

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg overflow-hidden hover-elevate transition-all flex flex-col h-[280px] sm:h-[320px] md:h-[360px] min-h-[280px] sm:min-h-[320px] md:min-h-[360px] max-h-[280px] sm:max-h-[320px] md:max-h-[360px]"
      data-testid={`product-card-${id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted flex-shrink-0 h-[120px] sm:h-[160px] md:h-[180px]">
        {!imageError && hasValidImage ? (
          <img
            src={cleanImageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              setImageError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="w-16 h-16 text-muted-foreground/50" />
          </div>
        )}
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

      <div className="flex-1 flex flex-col justify-between p-2 sm:p-3">
        <div>
          <div className="flex items-start justify-between ">
            <div className="flex-1">
              {brand && (
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">{brand}</p>
              )}
              <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground line-clamp-2" data-testid={`text-product-name-${id}`}>
                {name}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary" data-testid={`text-discounted-price-${id}`}>
            ₹{(discountedPrice || 0).toLocaleString()}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground line-through" data-testid={`text-original-price-${id}`}>
            ₹{(originalPrice || 0).toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
