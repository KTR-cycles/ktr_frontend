import { motion } from "framer-motion";
import { Truck, Wrench, ShieldCheck, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Truck,
    title: "Delivery Service",
    description: "At KTR Cycle World, we understand the importance of convenience. That's why we offer reliable delivery services for all your cycling needs. Your next ride is just a click away!",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Wrench,
    title: "Pick-Up Service",
    description: "Need a tune-up or repair? Take advantage of our hassle-free pickup services! Just schedule a time, and we'll collect your bike from your home or office.",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guarantee",
    description: "We stand behind the quality of every product we offer. We're committed to giving you a smooth, safe, and enjoyable cycling experience.",
    color: "from-green-500/20 to-green-500/5",
    iconColor: "text-green-600",
  },
  {
    icon: Award,
    title: "Wide Experience",
    description: "With years of experience in the cycling industry, our knowledgeable team is here to help you make the best choices.",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-600",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--primary)_0%,_transparent_50%)]"
        />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            >
              Our <span className="text-primary">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Discover how KTR Cycle World goes the extra mile to ensure your cycling journey is exceptional
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6 + index * 0.15,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <Card className="h-full bg-white/80 backdrop-blur-md border-border/50 shadow-lg hover-elevate transition-all duration-300 overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative p-8 md:p-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.8 + index * 0.15,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="mb-6"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-background to-accent/30 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <Icon className={`w-8 h-8 md:w-10 md:h-10 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
                        className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300"
                      >
                        {service.title}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 + index * 0.15, duration: 0.5 }}
                        className="text-base md:text-lg text-muted-foreground leading-relaxed"
                      >
                        {service.description}
                      </motion.p>

                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.4 + index * 0.15, duration: 0.6 }}
                        className={`h-1 w-full mt-6 rounded-full bg-gradient-to-r ${service.color.replace('/20', '').replace('/5', '/40')} origin-left`}
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-16 md:mt-24 text-center"
          >
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-primary/20">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Start Your <span className="text-primary">Cycling Journey?</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Visit us today and experience the KTR Cycle World difference. Your perfect ride awaits!
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </div>
  );
}
