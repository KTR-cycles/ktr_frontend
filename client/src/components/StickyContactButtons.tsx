import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function StickyContactButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white"
          onClick={() => window.open('https://wa.me/1234567890', '_blank')}
          data-testid="button-sticky-whatsapp"
        >
          <SiWhatsapp className="w-6 h-6" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.3 }}
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-2xl"
          onClick={() => window.location.href = 'mailto:info@ktrcycleworld.com'}
          data-testid="button-sticky-email"
        >
          <Mail className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  );
}
