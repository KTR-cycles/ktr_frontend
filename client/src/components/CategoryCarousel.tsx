import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useLocation } from "wouter";
import type { Category } from "@/types";
import kidsCycle from '@assets/generated_images/kids_cycle.jpeg';
import adultCycle from '@assets/generated_images/adult_cycle.jpeg';
import womenCycle from '@assets/generated_images/cycle_for_women.jpeg';
import electricCycle from '@assets/generated_images/electric_cycle.jpg';
import gearedCycle from '@assets/generated_images/geared_cycle.jpeg';
import { PATHS } from "./path";

// Hardcoded categories data
const HARDCODED_CATEGORIES: Category[] = [
  {
    category_id: "cat_001",
    name: "Kids Cycle",
    slug: "kids-cycle",
    description: "Perfect cycles for children and young riders",
    image: kidsCycle
  },
  {
    category_id: "cat_002",
    name: "Adult Cycle", 
    slug: "adult-cycle",
    description: "High-quality cycles for adult riders",
    image: adultCycle
  },
  {
    category_id: "cat_003",
    name: "Women's Cycle",
    slug: "womens-cycle", 
    description: "Specially designed cycles for women",
    image: womenCycle
  },
  {
    category_id: "cat_004",
    name: "Electric Cycle",
    slug: "electric-cycle",
    description: "Eco-friendly electric cycles for easy riding",
    image: electricCycle
  },
  {
    category_id: "cat_005",
    name: "Geared Cycle",
    slug: "geared-cycle",
    description: "Multi-speed cycles for varied terrain",
    image: gearedCycle
  }
];

// Category image mapping
const categoryImageMap: Record<string, string> = {
  'kids': kidsCycle,
  'children': kidsCycle,
  'kids cycle': kidsCycle,
  'kids bike': kidsCycle,
  'adult': adultCycle,
  'adult cycle': adultCycle,
  'women': womenCycle,
  'ladies': womenCycle,
  'women cycle': womenCycle,
  'ladies cycle': womenCycle,
  'electric': electricCycle,
  'e-bike': electricCycle,
  'electric cycle': electricCycle,
  'electric bike': electricCycle,
  'geared': gearedCycle,
  'geared cycle': gearedCycle,
  'gear cycle': gearedCycle,
  'mountain': gearedCycle,
  'mtb': gearedCycle,
};

const getCategoryImage = (categoryName: string, apiImage?: string): string | undefined => {
  // If API provides an image, use it
  if (apiImage) {
    return apiImage;
  }
  
  const normalizedName = categoryName.toLowerCase().trim();
  
  // Direct match
  if (categoryImageMap[normalizedName]) {
    return categoryImageMap[normalizedName];
  }
  
  // Partial match
  for (const [key, imagePath] of Object.entries(categoryImageMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return imagePath;
    }
  }
  
  return undefined;
};

export default function CategoryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 768px)': { slidesToScroll: 3 },
      '(min-width: 1024px)': { slidesToScroll: 4 },
    }
  });
  const [, setLocation] = useLocation();
  const categories = HARDCODED_CATEGORIES;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { PRODUCTS } = PATHS;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleCategoryClick = (category: Category) => {
    setLocation(`${PRODUCTS}?category=${encodeURIComponent(category.category_id)}`);
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto py-2">
        <div className="relative px-4 sm:px-6">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 justify-center">
            {categories.map((category: Category, index: number) => (
              <motion.button
                key={category.category_id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex-[0_0_auto] flex flex-col items-center gap-2 p-2 sm:p-2.5 md:p-3 rounded-lg hover:bg-primary/5 transition-all group min-w-0 w-[75px] sm:w-[90px] md:w-[110px]"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-22 md:h-22 rounded-full overflow-hidden bg-white flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl ring-2 ring-white ring-offset-2 ring-offset-transparent group-hover:ring-primary/30">
                  {(() => {
                    const imageUrl = getCategoryImage(category.name, category.image);
                    return imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm sm:text-base md:text-xl">
                          {category.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    );
                  })()}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-center text-foreground group-hover:text-primary transition-colors leading-tight whitespace-nowrap drop-shadow-sm">
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
