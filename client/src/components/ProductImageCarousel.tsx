import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { processImageUrls } from "@/utils/imageUtils";
import ProxyImage from "./ProxyImage";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export default function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({});

  // Process images to convert Google Drive URLs
  const processedImages = processImageUrls(images.join(','));
  const validImages = processedImages.filter(img => img && img.trim() && img.trim().startsWith('http'));
  const hasValidImages = validImages.length > 0;

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageLoad = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageStart = (index: number) => {
    setImageLoading(prev => ({ ...prev, [index]: true }));
  };

  if (!hasValidImages) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-lg flex items-center justify-center">
          <ImageOff className="w-24 h-24 text-muted-foreground/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md border border-border/50 shadow-lg group">
        <AnimatePresence mode="wait">
          {imageErrors[selectedIndex] ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ImageOff className="w-24 h-24 text-muted-foreground/50" />
            </div>
          ) : (
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-full h-full cursor-zoom-in ${
                isZoomed ? "scale-150 cursor-zoom-out" : ""
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <ProxyImage
                src={validImages[selectedIndex]}
                alt={`${productName} - Image ${selectedIndex + 1}`}
                className="w-full h-full object-contain"
                onLoad={() => handleImageLoad(selectedIndex)}
                onError={() => handleImageError(selectedIndex)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {validImages.length > 1 && !imageErrors[selectedIndex] && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-md border-border opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handlePrevious}
              data-testid="button-carousel-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-md border-border opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleNext}
              data-testid="button-carousel-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        <div className="absolute bottom-4 right-4 bg-black/60 text-white rounded-full px-3 py-1 text-sm backdrop-blur-sm">
          <ZoomIn className="w-4 h-4 inline mr-1" />
          Click to zoom
        </div>
      </div>

      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {validImages.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? "border-primary shadow-lg"
                  : "border-border hover:border-primary/50"
              }`}
              data-testid={`button-thumbnail-${index}`}
            >
              {imageErrors[index] ? (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <ImageOff className="w-8 h-8 text-muted-foreground/50" />
                </div>
              ) : (
                <ProxyImage
                  src={image}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-contain bg-white/80"
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
