import HeroCarousel from "@/components/HeroCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import GoogleMap from "@/components/GoogleMap";
import CategoryCarousel from "@/components/CategoryCarousel";
import AnimatedStats from "@/components/AnimatedStats";
import InstagramReelsSection from "@/components/InstagramReelsSection";
import BrandSlider from "@/components/BrandSlider";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  const mountainImage = '/assets/generated_images/Mountain_biking_adventure_scene_01077af1.png';
  const urbanImage = '/assets/generated_images/Urban_cycling_lifestyle_shot_0317efee.png';
  const groupImage = '/assets/generated_images/Group_cycling_community_scene_9b549ad4.png';
  const sunsetImage = '/assets/generated_images/Inspirational_cycling_sunset_silhouette_5fa0f6c8.png';

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

        {/* Sliding brand list marquee */}
        <BrandSlider />

        {/* Instagram Reels & Video Showcase with adaptive network resolution */}
        <InstagramReelsSection />

        {/* Community Testimonials */}
        <TestimonialsSection />

        {/* Showroom map + hours */}
        <GoogleMap />
      </div>
    </>
  );
}


