import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
}

export default function SEO({
  title = "KTR Cycle World - Best Cycles in Tirunelveli | Premium Bikes in Vannarpettai & Palayankottai",
  description = "KTR Cycle World - Leading cycle shop in Tirunelveli, Vannarpettai & Palayankottai. Best cycles in South Tamil Nadu. Premium mountain bikes, road bikes, electric cycles. Expert service, quality products, and unforgettable cycling adventures await.",
  keywords = "KTR Cycle, KTR Cycle World, best cycle in Tirunelveli, cycles in Vannarpettai, cycles in Palayankottai, best cycle shop Tirunelveli, cycle store South Tamil Nadu, premium cycles Tamil Nadu, mountain bikes Tirunelveli, road bikes Vannarpettai, electric cycles Palayankottai, cycle repair Tirunelveli, bicycle shop Tamil Nadu",
  canonicalUrl = "https://ktrcycleworld.com/",
  ogImage = "https://ktrcycleworld.com/ktr_cycle_logo.jpg",
  structuredData
}: SEOProps) {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KTR Cycle World",
    "description": "Leading cycle shop in Tirunelveli, Vannarpettai & Palayankottai. Best cycles in South Tamil Nadu. Premium mountain bikes, road bikes, electric cycles with expert service.",
    "url": "https://ktrcycleworld.com/",
    "logo": "https://ktrcycleworld.com/ktr_cycle_logo.jpg",
    "image": "https://ktrcycleworld.com/ktr_cycle_logo.jpg",
    "telephone": "+91-XXXXXXXXXX",
    "email": "info@ktrcycleworld.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vannarpettai",
      "addressLocality": "Tirunelveli",
      "addressRegion": "Tamil Nadu",
      "postalCode": "627001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "8.7139",
      "longitude": "77.7567"
    },
    "openingHours": [
      "Mo-Sa 09:00-20:00",
      "Su 10:00-18:00"
    ],
    "priceRange": "₹₹",
    "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
    "currenciesAccepted": "INR",
    "areaServed": [
      {
        "@type": "City",
        "name": "Tirunelveli"
      },
      {
        "@type": "City", 
        "name": "Vannarpettai"
      },
      {
        "@type": "City",
        "name": "Palayankottai"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "8.7139",
        "longitude": "77.7567"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cycles and Bicycles",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Mountain Bikes",
            "description": "Premium mountain bikes for adventure cycling"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Product",
            "name": "Road Bikes",
            "description": "High-performance road bikes for speed and endurance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product", 
            "name": "Electric Cycles",
            "description": "Eco-friendly electric cycles for modern commuting"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Kids Cycles",
            "description": "Safe and fun cycles for children"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/ktrcycleworld",
      "https://www.instagram.com/ktrcycleworld",
      "https://www.youtube.com/ktrcycleworld"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
}
