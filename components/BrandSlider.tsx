"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";

export interface BrandItem {
  name: string;
  tagline: string;
  color: string;
}

export const TOP_BRANDS: BrandItem[] = [
  { name: "HERCULES", tagline: "Made for Tough Rides", color: "from-blue-600 to-indigo-600" },
  { name: "BSA", tagline: "Generations of Trust", color: "from-emerald-600 to-teal-700" },
  { name: "MONTRA", tagline: "High Performance Bicycles", color: "from-cyan-600 to-blue-700" },
  { name: "AVON", tagline: "Reliable Everyday Cycling", color: "from-red-600 to-rose-700" },
  { name: "RALEIGH", tagline: "British Heritage & Quality", color: "from-slate-700 to-slate-900" },
  { name: "SUNCROSS", tagline: "Conquer Every Terrain", color: "from-amber-500 to-orange-600" },
  { name: "KEYSTO", tagline: "Precision & Performance", color: "from-violet-600 to-indigo-700" },
  { name: "SCHNELL", tagline: "Precision Sport Tech", color: "from-teal-600 to-cyan-700" },
  { name: "LUCEFIRE", tagline: "Speed & Modern Design", color: "from-rose-600 to-red-600" },
  { name: "GANG", tagline: "Fun & Trendy Rides", color: "from-purple-600 to-pink-600" },
  { name: "NINETY ONE", tagline: "Engineered for Adventure", color: "from-orange-600 to-red-600" },
  { name: "ALPHA", tagline: "Bold & Durable Bikes", color: "from-blue-600 to-cyan-600" },
  { name: "SCOTT", tagline: "Swiss Premium Engineering", color: "from-yellow-500 to-amber-600" },
  { name: "OYEKID", tagline: "Joyful Kids Bicycles", color: "from-lime-500 to-emerald-600" },
  { name: "WIFI", tagline: "Smart Modern Mobility", color: "from-sky-500 to-blue-600" },
  { name: "BEERIDE", tagline: "Smooth & Stylish Rides", color: "from-fuchsia-600 to-purple-600" },
];

export default function BrandSlider() {
  // Duplicate list to create a seamless infinite loop effect
  const marqueeItems = [...TOP_BRANDS, ...TOP_BRANDS];

  return (
    <section className="py-12 sm:py-16 bg-slate-900 text-white overflow-hidden relative border-y border-slate-800">
      
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Authorized Multi-Brand Retailer</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight text-white">
          World-Class <span className="text-amber-400 font-black">Bicycle Brands</span> We Host
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Explore top international and Indian cycle manufacturers available across all KTR Cycle World showrooms
        </p>
      </div>

      {/* Infinite Marquee Slider Container */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Left & Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-900 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-900 to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-4 sm:gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          }}
        >
          {marqueeItems.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 group bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 min-w-[200px] sm:min-w-[240px] shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className={`h-1.5 w-8 rounded-full bg-gradient-to-r ${brand.color}`} />
                <Award className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-400 transition-colors tracking-tight">
                {brand.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-medium line-clamp-1">
                {brand.tagline}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
