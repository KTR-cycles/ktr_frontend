"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  bike: string;
  avatar: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Kumar",
    location: "Tirunelveli Town",
    rating: 5,
    review:
      "Bought my first gear mountain bike from KTR Cycle World Town branch. The staff was incredibly knowledgeable and spent over 45 minutes helping me pick the perfect frame size and gear setup. Riding daily now — best experience!",
    bike: "Montra Mountain MTB",
    avatar: "RK",
  },
  {
    id: "t2",
    name: "Priya Sundaram",
    location: "Palayamkottai",
    rating: 5,
    review:
      "Superb customer service and genuine spare parts. They tuned up my hybrid cycle and it rides like brand new! Highly recommend their Samathanapuram & Palayankottai showrooms.",
    bike: "Urban Hybrid 7-Speed",
    avatar: "PS",
  },
  {
    id: "t3",
    name: "Murugan M.",
    location: "Palayamkottai",
    rating: 5,
    review:
      "Great variety of kids' cycles. Bought one for my son's 8th birthday — he absolutely loves it! Staff installed training wheels and helmet free of cost. Top-class service.",
    bike: "Hero Kids Sport 20T",
    avatar: "MM",
  },
  {
    id: "t4",
    name: "Suresh Perumal",
    location: "Tirunelveli Town",
    rating: 5,
    review:
      "Got a Hero Lectro electric cycle for my daily commute to office. Smooth riding experience, zero petrol costs, and great battery range. The team guided me on battery care thoroughly.",
    bike: "Hero Lectro Electric E-Bike",
    avatar: "SP",
  },
  {
    id: "t5",
    name: "Ananthakrishnan V.",
    location: "Kalakkad",
    rating: 5,
    review:
      "KTR Cycle World Kalakkad branch has top quality bicycles and accessories. Prompt mechanic service and honest advice on model selection. 5-star experience!",
    bike: "BSA 21-Speed Alloy Bike",
    avatar: "AV",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

function AvatarBubble({ initials, index }: { initials: string; index: number }) {
  const gradients = [
    "from-amber-500 to-orange-600",
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-purple-500 to-pink-600",
    "from-rose-500 to-red-600",
  ];
  return (
    <div
      className={`w-12 h-12 rounded-full bg-gradient-to-br ${
        gradients[index % gradients.length]
      } flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % TESTIMONIALS_DATA.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, []);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.96,
    }),
  };

  const t = TESTIMONIALS_DATA[current];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-4 h-4 text-amber-500" />
            <span>Community Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900 mb-3">
            What Our <span className="text-amber-500 font-black">Riders Say</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Real experiences from cycling enthusiasts and families across Tirunelveli, Palayamkottai, Kayathar & Kalakkad
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xl shadow-slate-200/60 relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-100 pointer-events-none" />

              <div className="flex flex-col gap-6 relative z-10">
                <StarRating rating={t.rating} />

                <p className="text-base sm:text-lg md:text-xl text-slate-800 leading-relaxed italic font-normal">
                  "{t.review}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <AvatarBubble initials={t.avatar} index={current} />
                    <div>
                      <h3 className="text-base font-bold text-slate-950">
                        {t.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {t.location} •{" "}
                        <span className="text-amber-600 font-semibold">{t.bike}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prev}
                      className="rounded-full w-9 h-9 border-slate-300 hover:bg-slate-100 text-slate-700"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={next}
                      className="rounded-full w-9 h-9 border-slate-300 hover:bg-slate-100 text-slate-700"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-amber-500"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
