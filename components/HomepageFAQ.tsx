"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { homepageFaqs } from "@/data/faqs";

export default function HomepageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold text-xs uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Cycle Buying &amp; Service FAQs in Tirunelveli
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Everything you need to know about buying, servicing, and delivering bicycles at KTR Cycle World.
          </p>
        </div>

        <div className="space-y-3">
          {homepageFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-4 sm:p-5 font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
