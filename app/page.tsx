import HeroCarousel from "@/components/HeroCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import GoogleMap from "@/components/GoogleMap";
import CategoryCarousel from "@/components/CategoryCarousel";
import AnimatedStats from "@/components/AnimatedStats";
import InstagramReelsSection from "@/components/InstagramReelsSection";
import BrandSlider from "@/components/BrandSlider";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocalSEOContent from "@/components/LocalSEOContent";
import HomepageFAQ from "@/components/HomepageFAQ";
import { homepageFaqs } from "@/data/faqs";

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ktrcycleworld.com';
  const mountainImage = '/assets/generated_images/Mountain_biking_adventure_scene_01077af1.png';
  const urbanImage = '/assets/generated_images/Urban_cycling_lifestyle_shot_0317efee.png';
  const groupImage = '/assets/generated_images/Group_cycling_community_scene_9b549ad4.png';
  const sunsetImage = '/assets/generated_images/Inspirational_cycling_sunset_silhouette_5fa0f6c8.png';

  const heroSlides = [
    {
      image: mountainImage,
      quote: "Cycles in Tirunelveli — Shop Bicycles from Leading Brands",
    },
    {
      image: urbanImage,
      quote: "Premium Mountain, Geared & Electric Bikes for South Tamil Nadu",
    },
    {
      image: groupImage,
      quote: "Ride together. Top Brands & Authorized Warranty",
    },
    {
      image: sunsetImage,
      quote: "Go faster with KTR Cycle World — 4 Local Showrooms",
    },
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KTR Cycle World",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KTR Cycle World",
    "url": siteUrl,
    "logo": `${siteUrl}/assets/generated_images/ktr_cycle_logo.jpg`,
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homepageFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="w-full">
        {/* Category quick-access strip */}
        <CategoryCarousel />

        {/* Hero Carousel Banner */}
        <section className="w-full" aria-label="Featured highlights">
          <HeroCarousel slides={heroSlides} />
        </section>

        {/* Animated trust stats */}
        <AnimatedStats />

        {/* Local SEO Explanatory Content Section */}
        <LocalSEOContent />

        {/* Featured products */}
        <FeaturedProducts />

        {/* Sliding brand list marquee */}
        <BrandSlider />

        {/* FAQ Accordion Section */}
        <HomepageFAQ />

        {/* Instagram Reels & Video Showcase */}
        <InstagramReelsSection />

        {/* Community Testimonials */}
        <TestimonialsSection />

        {/* Showroom map + hours */}
        <GoogleMap />
      </div>
    </>
  );
}


