"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Wind, Zap, Heart, Shield } from "lucide-react";

const features = [
  {
    icon: Wind,
    title: "Feel the Wind",
    description: "Experience the unmatched freedom of two wheels on open roads",
    gradient: "from-sky-400 to-blue-600",
    delay: 0,
  },
  {
    icon: Zap,
    title: "Boost Your Energy",
    description: "Every ride charges you up — body, mind, and soul",
    gradient: "from-amber-400 to-orange-500",
    delay: 0.1,
  },
  {
    icon: Heart,
    title: "Live Healthier",
    description: "30 minutes of daily cycling can transform your heart health",
    gradient: "from-rose-400 to-pink-600",
    delay: 0.2,
  },
  {
    icon: Shield,
    title: "Eco Warrior",
    description: "Zero emissions. Pure movement. Protect the planet while you ride",
    gradient: "from-emerald-400 to-teal-600",
    delay: 0.3,
  },
];

/* Animated SVG bicycle that rides along a path */
function RidingBike() {
  return (
    <div className="relative w-full h-32 sm:h-40 overflow-hidden">
      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      {/* Dashes */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex gap-8 items-end"
        animate={{ x: [0, -200] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-16 h-0.5 bg-primary/20 flex-shrink-0" />
        ))}
      </motion.div>

      {/* Bike SVG */}
      <motion.div
        className="absolute bottom-1"
        animate={{ x: ["10%", "85%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rear Wheel */}
          <motion.circle
            cx="15" cy="35" r="13"
            stroke="hsl(45,100%,50%)" strokeWidth="3" fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            style={{ originX: "15px", originY: "35px" }}
          />
          {/* Front Wheel */}
          <motion.circle
            cx="65" cy="35" r="13"
            stroke="hsl(45,100%,50%)" strokeWidth="3" fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            style={{ originX: "65px", originY: "35px" }}
          />
          {/* Spoke patterns */}
          <motion.line x1="15" y1="22" x2="15" y2="48" stroke="hsl(45,100%,50%)" strokeWidth="1.5" opacity="0.6"
            animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            style={{ originX: "15px", originY: "35px" }}
          />
          <motion.line x1="2" y1="35" x2="28" y2="35" stroke="hsl(45,100%,50%)" strokeWidth="1.5" opacity="0.6"
            animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            style={{ originX: "15px", originY: "35px" }}
          />
          {/* Frame */}
          <line x1="15" y1="35" x2="40" y2="20" stroke="hsl(45,100%,50%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="40" y1="20" x2="65" y2="35" stroke="hsl(45,100%,50%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="40" y1="20" x2="40" y2="35" stroke="hsl(45,100%,50%)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="15" y1="35" x2="40" y2="35" stroke="hsl(45,100%,50%)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Seat tube */}
          <line x1="40" y1="20" x2="35" y2="12" stroke="hsl(45,100%,50%)" strokeWidth="2" strokeLinecap="round" />
          {/* Seat */}
          <line x1="31" y1="11" x2="39" y2="11" stroke="hsl(45,100%,50%)" strokeWidth="3" strokeLinecap="round" />
          {/* Handlebar */}
          <line x1="65" y1="22" x2="60" y2="14" stroke="hsl(45,100%,50%)" strokeWidth="2" strokeLinecap="round" />
          <line x1="56" y1="13" x2="64" y2="13" stroke="hsl(45,100%,50%)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Fork */}
          <line x1="60" y1="14" x2="65" y2="35" stroke="hsl(45,100%,50%)" strokeWidth="2" strokeLinecap="round" />
          {/* Pedal crank */}
          <circle cx="40" cy="35" r="3" fill="hsl(45,100%,50%)" />
          <motion.line
            x1="40" y1="32" x2="40" y2="38"
            stroke="hsl(45,100%,50%)" strokeWidth="2" strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            style={{ originX: "40px", originY: "35px" }}
          />
        </svg>
      </motion.div>

      {/* Speed lines / wind effect */}
      <motion.div
        className="absolute top-4 left-0"
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeIn", delay: 0.5 }}
      >
        <div className="flex flex-col gap-1.5">
          <div className="w-12 h-0.5 bg-gradient-to-r from-primary/60 to-transparent rounded-full" />
          <div className="w-8 h-0.5 bg-gradient-to-r from-primary/40 to-transparent rounded-full" />
          <div className="w-10 h-0.5 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}

export default function WhyRideSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-accent/20 to-background"
    >
      {/* Parallax background circles */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-foreground mb-3 sm:mb-4">
            Why <span className="text-primary font-black">Ride With Us?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Join thousands of riders who chose KTR Cycle World for their journey
          </p>
        </motion.div>

        {/* Animated bike */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14"
        >
          <RidingBike />
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg p-5 sm:p-6 overflow-hidden cursor-default"
              >
                {/* Animated border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-5`} />
                </div>

                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
