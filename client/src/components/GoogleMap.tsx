import { motion } from "framer-motion";

interface GoogleMapProps {
  embedUrl?: string;
}

export default function GoogleMap({ embedUrl }: GoogleMapProps) {
  const defaultUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1!2d77.5!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890";

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Visit Our <span className="text-primary">Showroom</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
            height="450"
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
            <strong className="text-foreground">Address:</strong> 123 Cycling Street, Bike City, 560001
          </p>
          <p className="text-muted-foreground mt-2">
            <strong className="text-foreground">Hours:</strong> Mon-Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 6:00 PM
          </p>
        </motion.div>
      </div>
    </section>
  );
}
