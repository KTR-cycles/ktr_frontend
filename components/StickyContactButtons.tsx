"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsappUrl, DEFAULT_WHATSAPP_MESSAGE, instagram_url } from "@/utils/config";
import { trackWhatsAppLead } from "@/lib/analytics";

export default function StickyContactButtons() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end gap-2 mb-1"
          >
            <Button
              size="icon"
              className="w-12 h-12 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white"
              onClick={() => {
                trackWhatsAppLead("sticky_floating_button");
                window.open(buildWhatsappUrl(DEFAULT_WHATSAPP_MESSAGE), "_blank");
              }}
              data-testid="button-sticky-menu-whatsapp"
              aria-label="Open WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              className="w-12 h-12 rounded-full shadow-2xl bg-gradient-to-br from-[#f58529] via-[#d62976] to-[#962fbf] text-white"
              onClick={() => window.open(instagram_url, '_blank')}
              data-testid="button-sticky-menu-instagram"
              aria-label="Open Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-2xl bg-yellow-400 hover:bg-yellow-500 text-white"
          onClick={() => setOpen((v) => !v)}
          data-testid="button-sticky-toggle"
          aria-expanded={open}
          aria-label="Open social menu"
        >
          <Share2 className="w-8 h-8 text-white" />
        </Button>
      </motion.div>
    </div>
  );
}
