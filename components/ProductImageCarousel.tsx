"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export default function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const validImages = images.filter((img) => img && img.trim());

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md border border-border/50 shadow-lg group">
        {validImages.length > 0 && !imageErrors[selectedIndex] ? (
          <img
            key={selectedIndex}
            src={validImages[selectedIndex]}
            alt={`${productName} view ${selectedIndex + 1}`}
            className="w-full h-full object-contain p-4 cursor-zoom-in transition-opacity duration-300"
            onClick={() => setIsZoomed(true)}
            onError={() => setImageErrors((prev) => ({ ...prev, [selectedIndex]: true }))}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-accent/20">
            <ImageOff className="w-16 h-16 mb-2" />
            <p className="text-sm">Image unavailable</p>
          </div>
        )}

        {validImages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-md border-border/50 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-md border-border/50 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              onClick={handleNext}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {validImages.length > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 bottom-4 rounded-full bg-white/80 backdrop-blur-md border-border/50 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsZoomed(true)}
          >
            <ZoomIn className="w-5 h-5" />
          </Button>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {validImages.map((img, idx) => (
            <button
              key={idx}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                idx === selectedIndex ? "border-primary ring-2 ring-primary/20" : "border-border/50 opacity-70 hover:opacity-100"
              }`}
              onClick={() => setSelectedIndex(idx)}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && validImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={validImages[selectedIndex]}
            alt={productName}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
