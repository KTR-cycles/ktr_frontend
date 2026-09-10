import type { Product } from "@/types";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Pushes custom event data to GTM dataLayer and GA4 (if window.gtag exists).
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event: eventName,
    ...params,
    timestamp: new Date().toISOString(),
  };

  // Push to GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);

  // Send to GA4 via gtag if configured
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // Debug log in development environment
  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics Event] ${eventName}:`, eventPayload);
  }
}

/**
 * Tracks standard GA4 ecommerce product detail view (`view_item`).
 */
export function trackProductView(product: Product): void {
  if (!product) return;

  const price = product.discounted_price || product.original_price || product.currentPrice || 0;

  trackEvent("view_item", {
    currency: "INR",
    value: price,
    items: [
      {
        item_id: product.id || product.product_id,
        item_name: product.name,
        item_brand: product.brand || "KTR",
        item_category: product.category_name || product.category || "Cycle",
        price: price,
      },
    ],
    product_id: product.id || product.product_id,
    product_name: product.name,
    product_brand: product.brand,
    product_category: product.category_name || product.category,
    price: price,
  });
}

/**
 * Tracks search filter applications in product catalog.
 */
export function trackFilterApply(
  filters: {
    categories?: string[];
    brands?: string[];
    priceRange?: [number, number];
    searchQuery?: string;
  },
  resultCount: number
): void {
  const activeFiltersCount =
    (filters.categories?.length || 0) +
    (filters.brands?.length || 0) +
    (filters.searchQuery ? 1 : 0) +
    (filters.priceRange ? 1 : 0);

  // Avoid firing event on default blank state
  if (activeFiltersCount === 0) return;

  trackEvent("search_filter_apply", {
    search_term: filters.searchQuery || "",
    selected_categories: filters.categories?.join(",") || "",
    selected_brands: filters.brands?.join(",") || "",
    price_min: filters.priceRange ? filters.priceRange[0] : null,
    price_max: filters.priceRange ? filters.priceRange[1] : null,
    result_count: resultCount,
    filter_count: activeFiltersCount,
  });
}

/**
 * Tracks WhatsApp lead conversion clicks across the application.
 */
export function trackWhatsAppLead(
  source: string,
  details?: {
    product_id?: string;
    product_name?: string;
    price?: number | string;
  }
): void {
  trackEvent("generate_lead", {
    lead_type: "whatsapp_inquiry",
    lead_source: source,
    product_id: details?.product_id || null,
    product_name: details?.product_name || null,
    price: details?.price || null,
    currency: "INR",
  });
}
