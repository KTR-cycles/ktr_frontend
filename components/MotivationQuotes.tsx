"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface QuoteItem {
  text: string;
  author?: string;
}

interface MotivationQuotesProps {
  quotes: QuoteItem[];
  image?: string;
}

export default function MotivationQuotes({ quotes, image }: MotivationQuotesProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-accent/30 via-background to-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Why <span className="text-primary">Cycle?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Discover the joy, freedom, and health benefits that cycling brings to your life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {image && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-2 md:order-1"
            >
              <img
                src={image}
                alt="Cycling lifestyle"
                className="w-full h-auto rounded-3xl shadow-lg"
              />
            </motion.div>
          )}

          <div className={`space-y-4 sm:space-y-6 ${image ? 'order-1 md:order-2' : 'md:col-span-2'}`}>
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white/80 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl border border-border/50 shadow-lg hover-elevate transition-all"
                data-testid={`quote-card-${index}`}
              >
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4" />
                <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground leading-relaxed italic">
                  "{quote.text}"
                </blockquote>
                {quote.author && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4 font-medium">
                    — {quote.author}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
