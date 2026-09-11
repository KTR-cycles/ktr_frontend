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
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: "users",
    value: 10000,
    suffix: "+",
    label: "Happy Cyclists",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: "star",
    value: 15,
    suffix: "+",
    label: "Years of Trust",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: "trophy",
    value: 20,
    suffix: "+",
    label: "Premium Brands",
    color: "from-purple-500 to-pink-600",
  },
];

export default function AnimatedStats() {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Trusted by the{" "}
            <span className="text-amber-500">Cycling Community</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Numbers that speak for our passion and commitment in Tirunelveli
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-md text-white`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mb-1 tracking-tight">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
