"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Mountain,
  Bike,
  Gauge,
  ArrowRight,
  Sparkles,
  MapPin,
  Compass,
  Award,
  Zap,
} from "lucide-react";

interface CinematicScene {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
  accentGradient: string;
  specs: { label: string; value: string }[];
  hotspots: { x: number; y: number; title: string; desc: string }[];
}

const cinematicScenes: CinematicScene[] = [
  {
    id: "mountain",
    title: "Mountain Trail Adventure",
    subtitle: "Conquer Rugged Peaks & Dirt Trails",
    tagline: "Heavy-Duty Suspension & Extreme Off-Road Grip",
    description: "Tackle steep climbs and rocky descents with precision 21-speed Shimano index shifting and hydraulic disc brakes.",
    image: "/assets/generated_images/Mountain_biking_adventure_scene_01077af1.png",
    badge: "🏔️ Off-Road & Trail",
    accentGradient: "from-amber-500 via-orange-600 to-red-600",
    specs: [
      { label: "Gears", value: "21 Speed Shimano" },
      { label: "Brakes", value: "Hydraulic Dual Disc" },
      { label: "Fork", value: "100mm Lockout Shock" },
      { label: "Frame", value: "Hydroformed 6061 Alloy" },
    ],
    hotspots: [
      { x: 35, y: 45, title: "Hydraulic Disc Brakes", desc: "Instant precision stopping on muddy or steep descents" },
      { x: 55, y: 35, title: "6061 Alloy Frame", desc: "Heat-treated aluminum geometry for extreme rigidity" },
      { x: 78, y: 58, title: "21-Speed Derailleur", desc: "Seamless gear transitions under heavy load" },
    ],
  },
  {
    id: "urban",
    title: "Urban City Glider",
    subtitle: "Smooth City Commuting & Lifestyle",
    tagline: "Effortless Movement. Zero Stress.",
    description: "Designed for upright comfort, memory foam gel seating, and puncture-resistant city tread.",
    image: "/assets/generated_images/Urban_cycling_lifestyle_shot_0317efee.png",
    badge: "🏙️ City & Lifestyle",
    accentGradient: "from-cyan-600 via-blue-600 to-indigo-700",
    specs: [
      { label: "Saddle", value: "Plush Gel Comfort" },
      { label: "Tires", value: "Anti-Puncture Guard" },
      { label: "Routing", value: "Clean Internal Cable" },
      { label: "Fit", value: "Upright Ergonomic" },
    ],
    hotspots: [
      { x: 42, y: 32, title: "Plush Gel Saddle", desc: "Absorbs urban street vibrations for painless rides" },
      { x: 65, y: 52, title: "Puncture Guard Tires", desc: "Reinforced rubber layers protect against city road debris" },
    ],
  },
  {
    id: "community",
    title: "Community Group Ride",
    subtitle: "Ride Together. Grow Together.",
    tagline: "Unite with Tirunelveli's Passionate Cyclists",
    description: "Join weekend group rides, scenic coastal spins, and fitness challenges across South Tamil Nadu.",
    image: "/assets/generated_images/Group_cycling_community_scene_9b549ad4.png",
    badge: "👥 Community & Fitness",
    accentGradient: "from-emerald-600 via-teal-600 to-cyan-600",
    specs: [
      { label: "Rides", value: "Weekly Group Tours" },
      { label: "Support", value: "Showroom Service Hub" },
      { label: "Community", value: "500+ Local Members" },
      { label: "Events", value: "Monthly Fitness Rallies" },
    ],
    hotspots: [
      { x: 50, y: 40, title: "Group Cycling Club", desc: "Connect with friendly local riders for weekend spins" },
    ],
  },
  {
    id: "sunset",
    title: "Sunset Velocity Sprint",
    subtitle: "Aerodynamic Speed & Sprinting",
    tagline: "Maximum Speed with Minimum Air Drag",
    description: "Lightweight road racing frame engineered for high-velocity endurance along coastal highways.",
    image: "/assets/generated_images/Inspirational_cycling_sunset_silhouette_5fa0f6c8.png",
    badge: "🌅 Sunset Velocity",
    accentGradient: "from-fuchsia-600 via-purple-600 to-pink-600",
    specs: [
      { label: "Handlebar", value: "Aero Drop Bar" },
      { label: "Weight", value: "9.8 KG Ultra Light" },
      { label: "Tires", value: "700c High-PSI Road" },
      { label: "Speed", value: "Sprint Tuned" },
    ],
    hotspots: [
      { x: 30, y: 30, title: "Aero Drop Bars", desc: "Ergonomic tuck position for maximum velocity" },
      { x: 70, y: 60, title: "Low-Friction 700c Tires", desc: "Minimal rolling resistance for sprint speed" },
    ],
  },
];

export default function AnimatedCycleHero() {
  const [activeScene, setActiveScene] = useState<CinematicScene>(cinematicScenes[0]);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const router = useRouter();

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 min-h-[660px] lg:min-h-[740px] flex flex-col justify-between pt-6 pb-12 border-b border-slate-200/70">
      
      {/* Background Soft Glow Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-10 w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] rounded-full bg-slate-200/50 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 my-auto">
        
        {/* Top Location & Showroom Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Tirunelveli's Premier Cycle Destination</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
          </motion.div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" /> Palayankottai & Vannarpettai
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-600" /> Official Authorized Dealer
            </span>
          </div>
        </div>

        {/* Main Grid: Left Clean Hero Copy & Controls | Right Interactive Featured Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Clean Hero Copy & Scene Switcher */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScene.id + "-copy"}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xs uppercase tracking-widest font-extrabold text-amber-600 mb-2 block">
                    {activeScene.badge}
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-[1.12]">
                    EXPERIENCE THE{" "}
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeScene.accentGradient}`}>
                      THRILL OF MOTION
                    </span>
                  </h1>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {activeScene.tagline}. {activeScene.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Clean Light Scene Switcher Tabs */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Ride Category:</p>
              <div className="grid grid-cols-2 gap-2">
                {cinematicScenes.map((scene) => {
                  const isActive = activeScene.id === scene.id;
                  return (
                    <button
                      key={scene.id}
                      onClick={() => {
                        setActiveScene(scene);
                        setActiveHotspot(null);
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-300 text-xs font-bold ${
                        isActive
                          ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10 scale-[1.02]"
                          : "bg-white border-slate-200/90 text-slate-700 hover:border-amber-400 hover:text-slate-900 shadow-sm"
                      }`}
                    >
                      <span className="truncate">{scene.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Telemetry Specs Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id + "-specs"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-3 p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-sm"
              >
                {activeScene.specs.map((spec, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{spec.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{spec.value}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                onClick={() => router.push("/products")}
                className={`rounded-xl font-bold text-white bg-gradient-to-r ${activeScene.accentGradient} hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all duration-300 flex items-center justify-center gap-2 group px-6 py-6 text-sm`}
              >
                <span>Explore Our Cycles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/contact")}
                className="rounded-xl font-semibold border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-slate-900 px-6 py-6 text-sm bg-white shadow-sm"
              >
                <Compass className="w-4 h-4 mr-2 text-amber-500" />
                Book Showroom Visit
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN: Featured Card Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[340px] sm:min-h-[440px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.id + "-card"}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 group"
              >
                <img
                  src={activeScene.image}
                  alt={activeScene.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-md">
                    {activeScene.badge}
                  </span>
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/90 border border-slate-800/90 p-3.5 rounded-2xl backdrop-blur-xl shadow-xl flex items-center justify-between text-white">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Featured Category</span>
                    <span className="text-sm font-extrabold text-white">{activeScene.title}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    High Performance
                  </span>
                </div>

                {/* Hotspots */}
                {activeScene.hotspots.map((spot, index) => {
                  const isHotspotActive = activeHotspot === index;
                  return (
                    <div
                      key={index}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                    >
                      <button
                        onClick={() => setActiveHotspot(isHotspotActive ? null : index)}
                        className="relative flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-lg hover:scale-125 transition-transform"
                        aria-label={`Hotspot: ${spot.title}`}
                      >
                        <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75 pointer-events-none" />
                        <span>+</span>
                      </button>

                      <AnimatePresence>
                        {isHotspotActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute bottom-9 left-1/2 -translate-x-1/2 w-52 p-3 bg-slate-950/95 border border-amber-400/60 rounded-2xl shadow-2xl backdrop-blur-2xl text-left text-white z-40"
                          >
                            <div className="text-xs font-bold text-amber-400 flex items-center justify-between">
                              <span>{spot.title}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveHotspot(null);
                                }}
                                className="text-slate-400 hover:text-white font-bold"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-300 mt-1 leading-normal font-light">
                              {spot.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Trust Stats Strip */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-black text-amber-500">500+</span>
            <span className="text-xs text-slate-600 mt-0.5 font-semibold">Bicycles in Stock</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-black text-slate-900">100%</span>
            <span className="text-xs text-slate-600 mt-0.5 font-semibold">Genuine Parts & Warranty</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-black text-emerald-600">Free</span>
            <span className="text-xs text-slate-600 mt-0.5 font-semibold">First 3 Services</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-black text-blue-600">0% EMI</span>
            <span className="text-xs text-slate-600 mt-0.5 font-semibold">Instant Financing Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
