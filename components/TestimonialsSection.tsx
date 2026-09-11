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
      "Excellent service and genuine spare parts. They tuned up my old cycle and it rides like brand new! Highly recommend their Palayankottai & Vannarpettai showrooms.",
    bike: "Urban Hybrid",
    avatar: "PS",
  },
  {
    name: "Murugan M.",
    location: "Palayankottai",
    rating: 5,
    review:
      "Great variety of kids' cycles. Bought one for my son's birthday — he loves it! Staff even threw in a helmet and free initial services. Top-class customer service.",
    bike: "Kids Sport Cycle",
    avatar: "MM",
  },
  {
    name: "Suresh Perumal",
    location: "Tirunelveli Town",
    rating: 5,
    review:
      "Got an electric cycle for my daily office commute. Smooth experience, great range, zero fuel costs! The team guided me on battery maintenance thoroughly.",
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
            i < rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

function AvatarBubble({ initials, index }: { initials: string; index: number }) {
  const gradients = [
    "from-amber-400 to-orange-500",
    "from-cyan-400 to-blue-500",
    "from-emerald-400 to-teal-500",
    "from-purple-400 to-pink-500",
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
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

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
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
  };

  const t = testimonials[current];

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-y border-slate-200/80 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900 mb-3">
            What Our <span className="text-amber-500 font-black">Riders Say</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Real stories from the KTR Cycle World community in Tirunelveli
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
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl shadow-slate-200/60 relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-100 pointer-events-none" />

              <div className="flex flex-col gap-6 relative z-10">
                <StarRating rating={t.rating} />

                <p className="text-base sm:text-lg text-slate-800 leading-relaxed italic font-normal">
                  "{t.review}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <AvatarBubble initials={t.avatar} index={current} />
                    <div>
                      <h4 className="text-base font-bold text-slate-950">
                        {t.name}
                      </h4>
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
            {testimonials.map((_, i) => (
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
