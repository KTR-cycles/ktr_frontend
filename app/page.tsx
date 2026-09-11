import HeroCarousel from "@/components/HeroCarousel";
import MotivationQuotes from "@/components/MotivationQuotes";
import CyclingBenefits from "@/components/CyclingBenefits";
import FeaturedProducts from "@/components/FeaturedProducts";
import GoogleMap from "@/components/GoogleMap";
import CategoryCarousel from "@/components/CategoryCarousel";
import AnimatedStats from "@/components/AnimatedStats";
import WhyRideSection from "@/components/WhyRideSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramReelsSection from "@/components/InstagramReelsSection";

export default function HomePage() {
  const mountainImage = '/assets/generated_images/Mountain_biking_adventure_scene_01077af1.png';
  const urbanImage = '/assets/generated_images/Urban_cycling_lifestyle_shot_0317efee.png';
  const groupImage = '/assets/generated_images/Group_cycling_community_scene_9b549ad4.png';
  const sunsetImage = '/assets/generated_images/Inspirational_cycling_sunset_silhouette_5fa0f6c8.png';
  const wellnessImage = '/assets/generated_images/Peaceful_cycling_wellness_moment_d0d89c90.png';

  const heroSlides = [
    {
      image: mountainImage,
      quote: "Tirunelveli's best cycles. Start your adventure.",
    },
    {
      image: urbanImage,
      quote: "Premium rides for South Tamil Nadu.",
    },
    {
      image: groupImage,
      quote: "Ride together. Grow together.",
    },
    {
      image: sunsetImage,
      quote: "Go faster with KTR Cycle World.",
    },
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KTR Cycle World",
    "url": "https://ktrcycleworld.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ktrcycleworld.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KTR Cycle World",
    "url": "https://ktrcycleworld.com",
    "logo": "https://ktrcycleworld.com/assets/generated_images/ktr_cycle_logo.jpg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9342727735",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Tamil"]
    },
    "sameAs": [
      "https://www.instagram.com/ktr_cycleworld_tirunelveli"
    ]
  };

  const motivationQuotes = [
    { text: "Cycling is a simple solution to some of the world's most complicated problems." },
    { text: "Life is like riding a bicycle. To keep your balance you must keep moving." },
    { text: "When the spirits are low, when the day appears dark, just mount a bicycle and go out for a spin — and everything seems brighter." },
  ];

  const cyclingBenefits = [
    {
      icon: "heart" as const,
      title: "Cardiovascular Health",
      description: "Strengthen your heart, improve circulation, and reduce the risk of heart disease with regular cycling.",
    },
    {
      icon: "zap" as const,
      title: "Build Stamina & Strength",
      description: "Increase your endurance and muscle strength while enjoying every kilometre of the journey.",
    },
    {
      icon: "smile" as const,
      title: "Mental Wellbeing",
      description: "Reduce stress, anxiety, and depression. Cycling releases endorphins that boost your mood naturally.",
    },
    {
      icon: "trending" as const,
      title: "Weight Management",
      description: "Burn calories efficiently and maintain a healthy weight through regular cycling sessions.",
    },
    {
      icon: "users" as const,
      title: "Social Connection",
      description: "Join cycling groups and communities. Make friends and share amazing adventures together.",
    },
    {
      icon: "leaf" as const,
      title: "Eco-Friendly Transport",
      description: "Reduce your carbon footprint and contribute to a cleaner, greener environment.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="w-full">
        {/* Category quick-access strip */}
        <CategoryCarousel />

        {/* Hero Carousel Banner */}
        <section className="w-full" aria-label="Featured highlights">
          <HeroCarousel slides={heroSlides} />
        </section>

        {/* Animated trust stats — dark band */}
        <AnimatedStats />

        {/* Featured products */}
        <FeaturedProducts />

        {/* Why ride with us — animated SVG bike + feature cards */}
        <WhyRideSection />

        {/* Cycling lifestyle quotes */}
        <MotivationQuotes quotes={motivationQuotes} image={wellnessImage} />

        {/* Instagram Reels & Video Showcase with adaptive network resolution */}
        <InstagramReelsSection />

        {/* Community testimonials carousel */}
        <TestimonialsSection />

        {/* Health & lifestyle benefits grid */}
        <CyclingBenefits benefits={cyclingBenefits} />

        {/* Showroom map + hours */}
        <GoogleMap />
      </div>
    </>
  );
}
