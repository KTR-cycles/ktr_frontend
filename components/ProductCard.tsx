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
  ageGroup?: string;
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
  ageGroup,
  onViewDetails,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const cleanImageUrl = getFirstImageUrl(images || '');
  const targetIdentifier = slug || id;

  const hasDiscount = Number(originalPrice) > 0 && Number(originalPrice) > Number(discountedPrice);
  const calcDiscount = hasDiscount 
    ? Math.round(((Number(originalPrice) - Number(discountedPrice)) / Number(originalPrice)) * 100) 
    : 0;
  const finalDiscount = (discount && discount > 0) ? Math.round(discount) : calcDiscount;
  const savingsAmount = hasDiscount ? Number(originalPrice) - Number(discountedPrice) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-md hover:shadow-xl transition-all flex flex-col h-full cursor-pointer hover:scale-[1.01] overflow-hidden"
      data-testid={`product-card-${id}`}
      onClick={() => onViewDetails?.(targetIdentifier)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted flex-shrink-0">
        {cleanImageUrl && !imageError ? (
          <img
            src={cleanImageUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-accent/20">
            <ImageOff className="w-12 h-12 text-muted-foreground/50" />
          </div>
        )}
        {ageGroup ? (
          <Badge variant="secondary" className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-white font-semibold text-[9px] sm:text-xs rounded-full px-2 py-0.5 border border-white/20 shadow-sm pointer-events-none">
            {ageGroup}
          </Badge>
        ) : null}
        {finalDiscount > 0 ? (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 text-white font-black text-[9px] sm:text-xs rounded-full px-2 py-0.5 shadow-md border border-white/20 pointer-events-none">
            {finalDiscount}% OFF
          </Badge>
        ) : null}
      </div>

      <div className="flex-1 flex flex-col justify-between p-2.5 sm:p-4">
        <div>
          {brand && (
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-black mb-0.5">
              {brand}
            </p>
          )}
          <h3 className="text-xs sm:text-sm md:text-base font-heading font-bold text-foreground line-clamp-2 leading-tight group-hover:text-amber-600 transition-colors" data-testid={`text-product-name-${id}`}>
            {name}
          </h3>
        </div>

        {/* Price Section */}
        <div className="mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-1">
          {hasDiscount && (
            <div className="flex items-center justify-between text-[10px] sm:text-xs flex-wrap gap-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider">MRP:</span>
                <span className="text-slate-400 font-medium line-through" data-testid={`text-original-price-${id}`}>
                  ₹{Number(originalPrice || 0).toLocaleString()}
                </span>
              </div>
              {savingsAmount > 0 && (
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
                  Save ₹{savingsAmount.toLocaleString()}
                </span>
              )}
            </div>
          )}

          <div className="flex items-baseline justify-between flex-wrap gap-x-1">
            <span className="text-[10px] sm:text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Offer Price:
            </span>
            <span className="text-sm sm:text-lg md:text-xl font-heading font-black text-slate-900 dark:text-white" data-testid={`text-discounted-price-${id}`}>
              ₹{(discountedPrice || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
