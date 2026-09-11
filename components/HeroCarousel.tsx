"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";

interface Slide {
  image: string;
  quote: string;
  author?: string;
}

interface HeroCarouselProps {
  slides: Slide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[520px] md:min-h-[650px] overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative w-full h-[380px] sm:h-[520px] md:h-[650px]">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent backdrop-blur-[2px]" />
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                    >
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 drop-shadow-2xl max-w-4xl px-4">
                        {slide.quote}
                      </p>
                      {slide.author && (
                        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 font-light italic drop-shadow-lg px-4">
                          — {slide.author}
                        </p>
                      )}
                      <Button
                        variant="default"
                        size="default"
                        className="mt-6 sm:mt-8 rounded-full px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base shadow-xl"
                        data-testid="button-explore-cycles"
                        onClick={() => router.push('/products')}
                      >
                        Explore Our Cycles
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
            className="w-9 h-9 rounded-full flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            onClick={() => emblaApi?.scrollTo(index)}
            data-testid={`button-carousel-dot-${index}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-white w-6 h-2'
                  : 'bg-white/50 hover:bg-white/70 w-2 h-2'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
