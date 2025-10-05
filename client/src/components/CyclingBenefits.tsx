import { motion } from "framer-motion";
import { Heart, Zap, Smile, TrendingUp, Users, Leaf } from "lucide-react";

interface Benefit {
  icon: "heart" | "zap" | "smile" | "trending" | "users" | "leaf";
  title: string;
  description: string;
}

interface CyclingBenefitsProps {
  benefits: Benefit[];
}

const iconMap = {
  heart: Heart,
  zap: Zap,
  smile: Smile,
  trending: TrendingUp,
  users: Users,
  leaf: Leaf,
};

export default function CyclingBenefits({ benefits }: CyclingBenefitsProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Benefits of <span className="text-primary">Cycling</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your life one pedal at a time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-border/50 shadow-lg hover-elevate hover:shadow-xl transition-all group"
                data-testid={`benefit-card-${index}`}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
