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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ktrcycleworld.com';
  const heroSlides = [
    {
      image: '/images/banners/hercules_brute_banner.webp',
      alt: 'Hercules Brute 27T FSDD Electric Cycle - Special Offer ₹31,500',
      link: '/product/brute-fsdd',
      title: 'Hercules Brute 27T FSDD EC',
    },
    {
      image: '/images/banners/hercules_yuvolt_banner.webp',
      alt: 'Hercules Yuvolt Electric Cycle - Special Offer ₹24,500',
      link: '/products?category=cat_004',
      title: 'Hercules Yuvolt Electric Cycle',
    },
    {
      image: '/images/banners/aoki_street_mamba_banner.webp',
      alt: 'Aoki Mobility Street Mamba Fat Tire Electric Bike - Special Offer ₹67,500',
      link: '/product/aoki-street-mamba',
      title: 'Aoki Mobility Street Mamba',
    },
    {
      image: '/images/banners/bsa_maeve_banner.webp',
      alt: 'BSA Maeve 26T EC Electric Cycle - Special Offer ₹31,500',
      link: '/product/maeve-26t-ec',
      title: 'BSA Maeve 26T EC',
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


