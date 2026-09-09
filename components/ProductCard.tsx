"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ImageOff } from "lucide-react";
import { useState } from "react";
import { getFirstImageUrl } from "@/utils/imageUtils";

interface ProductCardProps {
  id: string;
  slug?: string;
  name: string;
  brand?: string;
  images: string;
  originalPrice: number;
  discount?: number;
  discountedPrice: number;
  categoryName?: string;
  onViewDetails?: (idOrSlug: string) => void;
}

export default function ProductCard({
  id,
  slug,
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
  const cleanImageUrl = getFirstImageUrl(images || '');
  const targetIdentifier = slug || id;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg overflow-hidden hover-elevate transition-all flex flex-col h-[280px] sm:h-[320px] md:h-[360px] min-h-[280px] sm:min-h-[320px] md:min-h-[360px] max-h-[280px] sm:max-h-[320px] md:max-h-[360px] cursor-pointer hover:shadow-xl hover:scale-[1.02]"
      data-testid={`product-card-${id}`}
      onClick={() => onViewDetails?.(targetIdentifier)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted flex-shrink-0 h-[150px] sm:h-[200px] md:h-[220px]">
        {cleanImageUrl && !imageError ? (
          <img
            src={cleanImageUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-accent/20">
            <ImageOff className="w-16 h-16 text-muted-foreground/50" />
          </div>
        )}
        {discount && discount > 0 ? (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-bold text-sm rounded-full px-3 py-1">
            {Math.round(discount)}% OFF
          </Badge>
        ) : null}
      </div>

      <div className="flex-1 flex flex-col justify-between p-2 sm:p-3">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {brand ? (
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">{brand}</p>
              ) : null}
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
          {Number(originalPrice) > 0 && Number(originalPrice) > Number(discountedPrice) && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through" data-testid={`text-original-price-${id}`}>
              ₹{Number(originalPrice || 0).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
