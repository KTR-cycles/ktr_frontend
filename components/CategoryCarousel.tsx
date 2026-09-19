"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import type { Category } from "@/types";

const kidsCycle = '/assets/generated_images/kids_cycle.jpeg';
const adultCycle = '/assets/generated_images/adult_cycle.jpeg';
const womenCycle = '/assets/generated_images/cycle_for_women.jpeg';
const electricCycle = '/assets/generated_images/electric_cycle.jpg';
const gearedCycle = '/assets/generated_images/geared_cycle.jpeg';

export interface CategoryItem extends Category {
  badge?: string;
}

const HARDCODED_CATEGORIES: CategoryItem[] = [
  {
    category_id: "cat_001",
    name: "Kids Cycle",
    slug: "kids-cycle",
    description: "Perfect cycles for children and young riders",
    image: kidsCycle,
    badge: "Popular",
  },
  {
    category_id: "cat_002",
    name: "Adult Cycle", 
    slug: "adult-cycle",
    description: "High-quality cycles for adult riders",
    image: adultCycle,
  },
  {
    category_id: "cat_004",
    name: "Women's Cycle",
    slug: "womens-cycle", 
    description: "Specially designed cycles for women",
    image: womenCycle,
  },
  {
    category_id: "cat_005",
    name: "Electric Cycle",
    slug: "electric-cycle",
    description: "Eco-friendly electric cycles for easy riding",
    image: electricCycle,
    badge: "Trending",
  },
  {
    category_id: "cat_003",
    name: "Geared Cycle",
    slug: "geared-cycle",
    description: "Multi-speed cycles for varied terrain",
    image: gearedCycle,
  }
];

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
  if (apiImage) return apiImage;
  const normalizedName = categoryName.toLowerCase().trim();
  if (categoryImageMap[normalizedName]) return categoryImageMap[normalizedName];
  for (const [key, imagePath] of Object.entries(categoryImageMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return imagePath;
    }
  }
  return undefined;
};

export default function CategoryCarousel() {
  const router = useRouter();
  const categories = HARDCODED_CATEGORIES;

  const handleCategoryClick = (category: Category) => {
    router.push(`/products?category=${encodeURIComponent(category.category_id)}`);
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-slate-900 border-b border-slate-800 py-3 sm:py-4 relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 relative z-10">
        
        {/* Header Label */}
        <div className="flex items-center justify-between px-2 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs md:text-sm font-extrabold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Explore Categories</span>
          </div>
          <button 
            onClick={() => router.push('/products')} 
            className="text-[11px] sm:text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 5-Column Non-Slider Responsive Grid */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-4 md:gap-6 items-start justify-items-center">
          {categories.map((category: CategoryItem, index: number) => (
            <motion.button
              key={category.category_id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => handleCategoryClick(category)}
              className="w-full max-w-[120px] flex flex-col items-center gap-1.5 p-1.5 sm:p-2.5 rounded-2xl transition-all duration-300 hover:bg-slate-800/80 focus:outline-none group active:scale-95"
            >
              <div className="relative">
                {/* Micro Badge */}
                {category.badge && (
                  <span className="absolute -top-1.5 -right-1 z-10 px-1 sm:px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md ring-1 ring-slate-900">
                    {category.badge}
                  </span>
                )}

                {/* Category Circular Image Container */}
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-800 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] ring-2 ring-slate-700/80 group-hover:ring-amber-400">
                  {(() => {
                    const imageUrl = getCategoryImage(category.name, category.image);
                    return imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center">
                        <span className="text-amber-400 font-black text-xs sm:text-base md:text-lg">
                          {category.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Category Name Label */}
              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-center text-slate-200 group-hover:text-amber-400 transition-colors leading-tight tracking-tight line-clamp-1 sm:line-clamp-none">
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>

      </div>
    </section>
  );
}
