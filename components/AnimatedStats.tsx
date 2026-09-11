"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Bike, Users, Star, Trophy } from "lucide-react";

interface StatItem {
  icon: "bike" | "users" | "star" | "trophy";
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const iconMap = {
  bike: Bike,
  users: Users,
  star: Star,
  trophy: Trophy,
};

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats: StatItem[] = [
  {
    icon: "bike",
    value: 500,
    suffix: "+",
    label: "Cycles in Stock",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: "users",
    value: 5000,
    suffix: "+",
    label: "Happy Riders",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: "trophy",
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
    color: "from-violet-400 to-purple-600",
  },
  {
    icon: "star",
    value: 20,
    suffix: "+",
    label: "Premium Brands",
    color: "from-rose-400 to-pink-600",
  },
];

export default function AnimatedStats() {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-foreground">
      {/* Background cycling track line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full opacity-5"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 Q300,0 600,60 Q900,120 1200,60"
            stroke="white"
            strokeWidth="3"
            fill="none"
          />
        </svg>
        {/* Floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -16, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Trusted by the{" "}
            <span className="text-primary">Cycling Community</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
            Numbers that speak for our passion and commitment
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="relative group cursor-default"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 text-center overflow-hidden">
                  {/* Glow blob */}
                  <div
                    className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
                  />

                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4 mx-auto shadow-lg`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>

                  <p className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
