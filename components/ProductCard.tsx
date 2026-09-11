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
      transition={{ duration: 0.4 }}
      className="group bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg overflow-hidden hover-elevate transition-all flex flex-col h-[300px] sm:h-[340px] md:h-[380px] min-h-[300px] sm:min-h-[340px] md:min-h-[380px] max-h-[300px] sm:max-h-[340px] md:max-h-[380px] cursor-pointer hover:shadow-xl hover:scale-[1.02] content-visibility-auto"
      data-testid={`product-card-${id}`}
      onClick={() => onViewDetails?.(targetIdentifier)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted flex-shrink-0 h-[150px] sm:h-[190px] md:h-[210px]">
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
        {ageGroup ? (
          <Badge variant="secondary" className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white font-medium text-[10px] sm:text-xs rounded-full px-2.5 py-0.5 border border-white/20 shadow-sm">
            {ageGroup}
          </Badge>
        ) : null}
        {finalDiscount > 0 ? (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 text-white font-black text-xs rounded-full px-3 py-1 shadow-lg border border-white/20">
            {finalDiscount}% OFF
          </Badge>
        ) : null}
      </div>

      <div className="flex-1 flex flex-col justify-between p-3 sm:p-4">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-1 mb-1">
                {brand ? (
                  <p className="text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-extrabold">{brand}</p>
                ) : <div />}
              </div>
              <h3 className="text-sm sm:text-base font-heading font-bold text-foreground line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors" data-testid={`text-product-name-${id}`}>
                {name}
              </h3>
            </div>
          </div>
        </div>

        {/* Attractive Price Container */}
        <div className="mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-0.5">
          {hasDiscount && (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">MRP:</span>
                <span className="text-xs text-slate-400 font-medium line-through" data-testid={`text-original-price-${id}`}>
                  ₹{Number(originalPrice || 0).toLocaleString()}
                </span>
              </div>
              {savingsAmount > 0 && (
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Save ₹{savingsAmount.toLocaleString()}
                </span>
              )}
            </div>
          )}

          <div className="flex items-baseline justify-between mt-0.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Offer Price:</span>
              <span className="text-xl sm:text-2xl font-heading font-black text-slate-900 dark:text-white" data-testid={`text-discounted-price-${id}`}>
                ₹{(discountedPrice || 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
