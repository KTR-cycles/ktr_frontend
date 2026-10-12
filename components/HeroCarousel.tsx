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
  quote?: string;
  author?: string;
  alt?: string;
  link?: string;
  title?: string;
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
    <div className="relative w-full aspect-[16/9] sm:aspect-[1.92/1] max-h-[620px] overflow-hidden group select-none bg-slate-950">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative w-full h-full cursor-pointer"
              onClick={() => {
                if (slide.link) router.push(slide.link);
                else router.push('/products');
              }}
              title={slide.title || "View details"}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.alt || slide.title || `KTR Cycle World Banner ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.01]"
                />
                {slide.quote && (
                  <>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(slide.link || '/products');
                            }}
                          >
                            <span>Explore Our Cycles</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          scrollPrev();
        }}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/50 hover:bg-slate-950/80 border border-white/20 text-white flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-110 z-20 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          scrollNext();
        }}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/50 hover:bg-slate-950/80 border border-white/20 text-white flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-110 z-20 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Carousel Pagination Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 z-20 bg-slate-950/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
        {slides.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              emblaApi?.scrollTo(index);
            }}
            data-testid={`button-carousel-dot-${index}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-amber-400 w-5 sm:w-6 h-1.5 sm:h-2 shadow-sm'
                  : 'bg-white/50 hover:bg-white/80 w-1.5 sm:w-2 h-1.5 sm:h-2'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
