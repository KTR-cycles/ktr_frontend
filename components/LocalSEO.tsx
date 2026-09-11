import { STORE_LOCATIONS } from "@/data/storeLocations";

export default function LocalSEO() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KTR Cycle World",
    "image": "https://ktrcycleworld.com/assets/generated_images/ktr_cycle_logo.jpg",
    "logo": "https://ktrcycleworld.com/assets/generated_images/ktr_cycle_logo.jpg",
    "@id": "https://ktrcycleworld.com/#localbusiness",
    "url": "https://ktrcycleworld.com",
    "telephone": "+91-9342727735",
    "email": "ktrcycleworld006@gmail.com",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nainar kulam road",
      "addressLocality": "Tirunelveli",
      "addressRegion": "Tamil Nadu",
      "postalCode": "627006",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.7296942,
      "longitude": 77.690064
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Tirunelveli" },
      { "@type": "City", "name": "Samathanapuram" },
      { "@type": "City", "name": "Palayamkottai" },
      { "@type": "City", "name": "Kayathar" },
      { "@type": "City", "name": "Kalakkad" }
    ],
    "hasPOS": STORE_LOCATIONS.map((loc) => ({
      "@type": "Store",
      "name": loc.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": loc.address,
        "addressLocality": loc.city,
        "addressRegion": "Tamil Nadu",
        "postalCode": loc.postalCode,
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": loc.coordinates.lat,
        "longitude": loc.coordinates.lng
      },
      "telephone": loc.phone,
      "hasMap": loc.googleMapsUrl
    })),
    "sameAs": [
      "https://www.instagram.com/ktr_cycleworld_tirunelveli"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
