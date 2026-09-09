import type { Metadata } from 'next';
import { Truck, Wrench, ShieldCheck, Award } from "lucide-react";

export const metadata: Metadata = {
  title: 'About Us | Best Cycle Showroom in Tirunelveli',
  description: 'Learn about KTR Cycle World, the leading bicycle store in Tirunelveli, Vannarpettai & Palayankottai. Premium bikes, doorstep delivery, repair service, and quality guarantee.',
  keywords: [
    'about KTR Cycle World',
    'cycle store Tirunelveli',
    'bicycle shop Vannarpettai',
    'best cycle showroom South Tamil Nadu',
  ],
  alternates: {
    canonical: 'https://ktrcycleworld.com/about',
  },
  openGraph: {
    title: 'About KTR Cycle World | Premier Cycle Store in Tirunelveli',
    description: 'South Tamil Nadu’s premier cycling destination offering top-grade bicycles, accessories, and expert maintenance.',
    url: 'https://ktrcycleworld.com/about',
    siteName: 'KTR Cycle World',
    type: 'website',
  },
};

const services = [
  {
    icon: Truck,
    title: "Delivery Service",
    description: "At KTR Cycle World, we offer reliable delivery services for all your cycling needs in Tirunelveli, Vannarpettai, and Palayankottai.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Wrench,
    title: "Pick-Up & Repair Service",
    description: "Need a tune-up or repair? Take advantage of our hassle-free pickup services! Just schedule a time, and we'll collect your bike.",
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
    description: "With years of experience in the cycling industry, our knowledgeable team is here to help you make the best choices for your riding style.",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-600",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About <span className="text-primary">KTR Cycle World</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Welcome to South Tamil Nadu’s premier cycling destination. Located in Tirunelveli, we provide top-grade bicycles, accessories, and expert maintenance services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className={`p-8 rounded-2xl border h-full bg-gradient-to-br ${service.color} border-border/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-start gap-5">
                  <div className={`p-4 rounded-2xl bg-white shadow-md ${service.iconColor}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
