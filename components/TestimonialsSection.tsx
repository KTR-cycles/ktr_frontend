"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  review: string;
  bike: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    location: "Tirunelveli",
    rating: 5,
    review:
      "Bought my first mountain bike from KTR Cycle World. The staff was incredibly knowledgeable, helped me pick the perfect bike for my budget. Been riding for 6 months — best decision ever!",
    bike: "Mountain Bike",
    avatar: "RK",
  },
  {
    name: "Priya Sundaram",
    location: "Vannarpettai",
    rating: 5,
    review:
      "Amazing collection of women's cycles. I was looking for a lightweight city bike and they had exactly what I needed. The quality is premium and the price was very fair. Highly recommended!",
    bike: "City Cycle",
    avatar: "PS",
  },
  {
    name: "Arjun Selvam",
    location: "Palayankottai",
    rating: 5,
    review:
      "Got my son's first cycle from here for his birthday. They were so patient in helping us choose the right size. The kids range is fantastic — durable, safe, and colorful!",
    bike: "Kids Cycle",
    avatar: "AS",
  },
  {
    name: "Meena Krishnan",
    location: "Tirunelveli",
    rating: 5,
    review:
      "I ride every morning and evening. KTR Cycle World has the best service team. They tuned my geared cycle perfectly. Fast service, honest pricing, and genuinely passionate staff.",
    bike: "Geared Cycle",
    avatar: "MK",
  },
  {
    name: "Suresh Pandian",
    location: "Nanguneri",
    rating: 5,
    review:
      "Switched to an electric cycle after their demo session. The range is incredible and commuting has become so much fun. The after-sale support is exceptional too!",
    bike: "Electric Cycle",
    avatar: "SP",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-primary fill-primary" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

function AvatarBubble({ initials, index }: { initials: string; index: number }) {
  const colors = [
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-teal-500",
    "from-violet-400 to-purple-600",
    "from-rose-400 to-pink-600",
    "from-sky-400 to-blue-600",
  ];
  return (
    <div
      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${
        colors[index % colors.length]
      } flex items-center justify-center text-white font-extrabold text-lg sm:text-xl shadow-lg flex-shrink-0`}
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
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, []);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
    }),
  };

  const t = testimonials[current];

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-foreground via-foreground/95 to-foreground relative overflow-hidden">
      {/* Decorative arcs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full border border-white/5 opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full border border-white/5 opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full border border-white/5 opacity-10" />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Our <span className="text-primary">Riders Say</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base">
            Stories from the KTR Cycle World community
          </p>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10">
                <Quote className="w-8 h-8 text-primary mb-4 opacity-80" />

                <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed italic mb-6">
                  "{t.review}"
                </p>

                <div className="flex items-center gap-4">
                  <AvatarBubble initials={t.avatar} index={current} />
                  <div>
                    <p className="text-white font-bold text-base sm:text-lg">
                      {t.name}
                    </p>
                    <p className="text-white/50 text-sm">{t.location}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <StarRating rating={t.rating} />
                      <span className="text-primary text-xs font-medium border border-primary/30 rounded-full px-2 py-0.5">
                        {t.bike}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-primary w-6 h-2"
                    : "bg-white/30 w-2 h-2 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
