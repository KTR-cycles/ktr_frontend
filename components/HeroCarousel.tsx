"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
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
    <div className="relative w-full min-h-[380px] sm:min-h-[520px] md:min-h-[620px] overflow-hidden group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative w-full h-[380px] sm:h-[520px] md:h-[620px]">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/20 backdrop-blur-[1px]" />
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -25 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                    >
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="inline-block px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs sm:text-sm font-semibold tracking-wide mb-3 backdrop-blur-md"
                      >
                        KTR CYCLE WORLD • TIRUNELVELI
                      </motion.span>
                      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 drop-shadow-2xl max-w-4xl px-4 leading-tight tracking-tight">
                        {slide.quote}
                      </h1>
                      {slide.author && (
                        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/90 font-light italic drop-shadow-lg px-4 mb-2">
                          — {slide.author}
                        </p>
                      )}
                      <Button
                        variant="default"
                        size="default"
                        className="mt-4 sm:mt-6 rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-2xl transition-all duration-300 flex items-center gap-2 group/btn"
                        data-testid="button-explore-cycles"
                        onClick={() => router.push('/products')}
                      >
                        <span>Explore Our Cycles</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-110 z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-110 z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20 bg-slate-950/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
            className="w-7 h-7 rounded-full flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            onClick={() => emblaApi?.scrollTo(index)}
            data-testid={`button-carousel-dot-${index}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-amber-400 w-6 h-2'
                  : 'bg-white/50 hover:bg-white/80 w-2 h-2'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
