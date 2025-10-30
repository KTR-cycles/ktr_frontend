import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { whatsapp_url, instagram_url } from "@/utils/config";

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
              onClick={() => window.open(whatsapp_url, '_blank')}
              data-testid="button-sticky-menu-whatsapp"
              aria-label="Open WhatsApp"
            >
              <SiWhatsapp className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              className="w-12 h-12 rounded-full shadow-2xl bg-gradient-to-br from-[#f58529] via-[#d62976] to-[#962fbf] text-white"
              onClick={() => window.open(instagram_url, '_blank')}
              data-testid="button-sticky-menu-instagram"
              aria-label="Open Instagram"
            >
              <SiInstagram className="w-5 h-5" />
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
          className="w-14 h-14 rounded-full shadow-2xl bg-primary text-primary-foreground"
          onClick={() => setOpen((v) => !v)}
          data-testid="button-sticky-toggle"
          aria-expanded={open}
          aria-label="Open social menu"
        >
          {/* Simple plus/minus icon using CSS (avoid extra icon deps) */}
          <span
            className={`block relative w-6 h-6 after:content-[''] after:absolute after:inset-0 after:m-auto after:h-0.5 after:w-6 after:bg-current before:content-[''] before:absolute before:inset-0 before:m-auto before:h-6 before:w-0.5 before:bg-current transition-transform ${open ? 'rotate-45' : ''}`}
          />
        </Button>
      </motion.div>
    </div>
  );
}
