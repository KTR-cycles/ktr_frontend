import { motion } from "framer-motion";
import { Truck, MapPin, Award, Star } from "lucide-react";

interface Service {
  icon: "delivery" | "pickup" | "quality" | "experience";
  title: string;
  description: string;
}

interface ServicesSectionProps {
  services: Service[];
}

const iconMap = {
  delivery: Truck,
  pickup: MapPin,
  quality: Award,
  experience: Star,
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-accent/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing exceptional service at every step
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center bg-white/80 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl border border-border/50 shadow-lg hover-elevate transition-all group"
                data-testid={`service-card-${index}`}
              >
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-xl bg-primary/10 mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
