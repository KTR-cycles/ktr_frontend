import { motion } from "framer-motion";

interface GoogleMapProps {
  embedUrl?: string;
}

export default function GoogleMap({ embedUrl }: GoogleMapProps) {
  const defaultUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.8!2d77.690064!3d8.7296942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDMnNDYuOSJOIDc3wrA0MScyMi4yIkU!5e0!3m2!1sen!2sin!4v1234567890";
  const address = "KTR CYCLE WORLD - Nainar kulam road, Tirunelveli, Tamil Nadu, India - 627006";
  const hours = "Mon-Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM";

  return (
    <section id="showroom-map" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Visit Our <span className="text-primary">Showroom</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Come experience our cycles in person at our premium showroom
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-2xl border border-border"
        >
          <iframe
            src={embedUrl || defaultUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="KTR Cycle World Showroom Location"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground">
            <strong className="text-foreground">Address:</strong> {address}
          </p>
          <p className="text-muted-foreground mt-2">
            <strong className="text-foreground">Hours:</strong> {hours}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
