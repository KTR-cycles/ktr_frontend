"use client";

import { motion } from "framer-motion";
import { MessageCircle, Instagram } from "lucide-react";
import { buildWhatsappUrl, DEFAULT_WHATSAPP_MESSAGE, instagram_url } from "@/utils/config";
import { trackWhatsAppLead } from "@/lib/analytics";

export default function StickyContactButtons() {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      {/* WhatsApp */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3, type: "spring" }}
      >
        <button
          className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl transition-all duration-200 hover:shadow-green-500/30 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
          onClick={() => {
            trackWhatsAppLead("sticky_floating_button");
            window.open(buildWhatsappUrl(DEFAULT_WHATSAPP_MESSAGE), "_blank");
          }}
          data-testid="button-sticky-whatsapp"
          aria-label="Chat on WhatsApp"
        >
          {/* Icon always visible */}
          <span className="flex items-center justify-center w-14 h-14 rounded-full">
            <MessageCircle className="w-6 h-6" />
          </span>
          {/* Label slides in on hover (desktop) */}
          <span className="hidden sm:block max-w-0 overflow-hidden group-hover:max-w-xs group-hover:pr-4 transition-all duration-300 text-sm font-semibold whitespace-nowrap">
            WhatsApp
          </span>
        </button>
      </motion.div>

      {/* Instagram */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.3, type: "spring" }}
      >
        <button
          className="group flex items-center gap-2 bg-gradient-to-br from-[#f58529] via-[#d62976] to-[#962fbf] hover:brightness-110 text-white rounded-full shadow-2xl transition-all duration-200 hover:shadow-pink-500/30 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d62976]"
          onClick={() => window.open(instagram_url, "_blank")}
          data-testid="button-sticky-instagram"
          aria-label="Follow on Instagram"
        >
          <span className="flex items-center justify-center w-14 h-14 rounded-full">
            <Instagram className="w-6 h-6" />
          </span>
          <span className="hidden sm:block max-w-0 overflow-hidden group-hover:max-w-xs group-hover:pr-4 transition-all duration-300 text-sm font-semibold whitespace-nowrap">
            Instagram
          </span>
        </button>
      </motion.div>
    </div>
  );
}
