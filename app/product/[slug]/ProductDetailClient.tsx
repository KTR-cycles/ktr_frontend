"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Check, 
  MessageCircle, 
  Share2, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Award,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildWhatsappUrl } from "@/utils/config";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import SharePopup from "@/components/SharePopup";
import ProductReviews from "@/components/ProductReviews";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, getAgeGroupForProduct } from "@/lib/products";
import { trackProductView, trackWhatsAppLead } from "@/lib/analytics";
import type { Product } from "@/types";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [shareOpen, setShareOpen] = useState(false);

  // Track product page view
  useEffect(() => {
    if (product) {
      trackProductView(product);
    }
  }, [product]);

  // Normalize images list
  const images = Array.isArray(product.images_list) && product.images_list.length > 0
    ? product.images_list
    : typeof product.images === "string" && product.images.trim()
      ? [product.images]
      : product.image
        ? [product.image]
        : [];

  const currentPrice = product.discounted_price || product.original_price || product.currentPrice || "Contact for Price";
  const hasOriginalPrice = product.original_price && product.discounted_price && product.original_price !== product.discounted_price;

  // Calculate discount percentage
  const origNum = typeof product.original_price === "number" ? product.original_price : parseFloat(String(product.original_price || 0));
  const discNum = typeof product.discounted_price === "number" ? product.discounted_price : parseFloat(String(product.discounted_price || 0));
  const discountPercent = (origNum > 0 && discNum > 0 && origNum > discNum) 
    ? Math.round(((origNum - discNum) / origNum) * 100)
    : null;

  // Parse specifications safely
  let specsList: { label: string; value: string }[] = [];
  if (Array.isArray(product.specifications)) {
    specsList = product.specifications;
  } else if (typeof product.specifications === "string" && product.specifications.trim()) {
    try {
      const parsed = JSON.parse(product.specifications);
      if (Array.isArray(parsed)) specsList = parsed;
    } catch {
      specsList = [{ label: "Specification", value: product.specifications }];
    }
  }

  // Parse features safely
  let featuresList: string[] = [];
  if (Array.isArray(product.features)) {
    featuresList = product.features.map(f => (typeof f === "string" ? f : f.title || f.text || String(f)));
  } else if (typeof product.features === "string" && product.features.trim()) {
    try {
      const parsed = JSON.parse(product.features);
      if (Array.isArray(parsed)) {
        featuresList = parsed.map(f => (typeof f === "string" ? f : f.title || f.text || String(f)));
      } else {
        featuresList = [product.features];
      }
    } catch {
      featuresList = product.features.split("\n").filter(f => f.trim());
    }
  }

  // WhatsApp enquiry message
  const whatsappMessage = `Hello KTR Cycle World 👋\n\nI am interested in buying/enquiring about:\n🚴 *${product.name}*\nBrand: ${product.brand || 'KTR'}\nPrice: ₹${currentPrice}\n\nCould you please confirm stock availability and delivery options?`;

  // Related products
  const relatedProducts = getProductsByCategory(product.category || product.category_id || product.category_name || '')
    .filter((p) => p.id !== product.id && p.slug !== product.slug)
    .slice(0, 3);

  // Sample customer reviews
  const reviews = [
    {
      id: "rev-1",
      userName: "Karthik Raj",
      rating: 5,
      comment: "Purchased this bicycle from KTR Cycle World Tirunelveli. Smooth ride, great build quality, and excellent customer service!",
      date: "2 weeks ago",
      helpful: 12
    },
    {
      id: "rev-2",
      userName: "Muthu Lakshmi",
      rating: 5,
      comment: "Very durable build and light frame. Got free assembly and quick delivery at Palayankottai.",
      date: "1 month ago",
      helpful: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          {product.category_name && (
            <>
              <ChevronRight className="w-4 h-4" />
              <Link 
                href={`/products?category=${encodeURIComponent(product.category_id || product.category || '')}`} 
                className="hover:text-primary transition-colors"
              >
                {product.category_name}
              </Link>
            </>
          )}
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Carousel */}
          <div>
            <ProductImageCarousel images={images} productName={product.name} />
          </div>

          {/* Right Column: Information & Actions */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.brand && (
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  {product.brand}
                </span>
              )}
              {product.category_name && (
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">
                  {product.category_name}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                In Stock at Showroom
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Attractive Premium Price Hero Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-background border border-amber-500/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col gap-2 relative z-10">
                {/* MRP Line & Savings Badge */}
                {hasOriginalPrice && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">MRP:</span>
                    <span className="text-base sm:text-lg text-slate-400 font-semibold line-through">
                      ₹{Number(product.original_price).toLocaleString()}
                    </span>
                    {origNum > discNum && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-black shadow-md flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Save ₹{(origNum - discNum).toLocaleString()} ({discountPercent}% OFF)
                      </span>
                    )}
                  </div>
                )}

                {/* Offer Price Header */}
                <div className="flex items-baseline gap-3 flex-wrap mt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">Offer Price:</span>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 dark:text-white">
                      ₹{typeof currentPrice === 'number' ? currentPrice.toLocaleString() : currentPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-500/20 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 font-medium relative z-10">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> Inclusive of GST & All Taxes
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-500" /> Free Showroom Pre-Assembly
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-500" /> 0% Financing / EMI Available
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {product.short_description || product.description || `Experience high performance and superior comfort with the ${product.name}. Designed for endurance, strength, and smooth rides across all terrains in Tirunelveli.`}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                className="flex-1 rounded-full text-base font-bold py-6 shadow-xl bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
                onClick={() => {
                  trackWhatsAppLead("product_detail", {
                    product_id: product.id || product.product_id,
                    product_name: product.name,
                    price: currentPrice,
                  });
                  window.open(buildWhatsappUrl(whatsappMessage), "_blank");
                }}
                data-testid="button-whatsapp-inquiry"
              >
                <MessageCircle className="w-6 h-6" />
                Enquire via WhatsApp
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 py-6 border-border/60 hover:bg-accent/20 gap-2"
                onClick={() => setShareOpen(true)}
                data-testid="button-share-product"
              >
                <Share2 className="w-5 h-5" />
                Share
              </Button>
            </div>

            {/* Highlight Badges / Store Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-border/40 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Local Delivery</h4>
                  <p className="text-[11px] text-muted-foreground">Tirunelveli & nearby</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-border/40 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Quality Assured</h4>
                  <p className="text-[11px] text-muted-foreground">Original Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Features Tabs */}
        <div className="space-y-8">
          {/* Specifications */}
          {(specsList.length > 0 || product.frame || product.gears || product.brakes) && (
            <Card className="p-6 sm:p-8 border-border/50 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Technical Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 px-4 rounded-xl bg-accent/20 border border-border/30">
                  <span className="text-sm font-semibold text-muted-foreground">Suitable Age Group</span>
                  <span className="text-sm font-bold text-primary">{getAgeGroupForProduct(product)}</span>
                </div>
                {product.frame && (
                  <div className="flex justify-between py-3 px-4 rounded-xl bg-accent/20 border border-border/30">
                    <span className="text-sm font-semibold text-muted-foreground">Frame Material</span>
                    <span className="text-sm font-bold text-foreground">{product.frame}</span>
                  </div>
                )}
                {product.gears && (
                  <div className="flex justify-between py-3 px-4 rounded-xl bg-accent/20 border border-border/30">
                    <span className="text-sm font-semibold text-muted-foreground">Gears / Speed</span>
                    <span className="text-sm font-bold text-foreground">{product.gears}</span>
                  </div>
                )}
                {product.brakes && (
                  <div className="flex justify-between py-3 px-4 rounded-xl bg-accent/20 border border-border/30">
                    <span className="text-sm font-semibold text-muted-foreground">Brake System</span>
                    <span className="text-sm font-bold text-foreground">{product.brakes}</span>
                  </div>
                )}
                {product.tire_size && (
                  <div className="flex justify-between py-3 px-4 rounded-xl bg-accent/20 border border-border/30">
                    <span className="text-sm font-semibold text-muted-foreground">Tire Size</span>
                    <span className="text-sm font-bold text-foreground">{product.tire_size}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between py-3 px-4 rounded-xl bg-accent/20 border border-border/30">
                    <span className="text-sm font-semibold text-muted-foreground">Cycle Weight</span>
                    <span className="text-sm font-bold text-foreground">{product.weight}</span>
                  </div>
                )}
                {product.color && (
                  <div className="flex justify-between py-3 px-4 rounded-xl bg-accent/20 border border-border/30">
                    <span className="text-sm font-semibold text-muted-foreground">Available Color</span>
                    <span className="text-sm font-bold text-foreground">{product.color}</span>
                  </div>
                )}
                {specsList.map((spec, index) => (
                  <div key={index} className="flex justify-between py-3 px-4 rounded-xl bg-accent/20 border border-border/30">
                    <span className="text-sm font-semibold text-muted-foreground">{spec.label || `Feature ${index + 1}`}</span>
                    <span className="text-sm font-bold text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Key Features */}
          {featuresList.length > 0 && (
            <Card className="p-6 sm:p-8 border-border/50 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuresList.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-border/30">
                    <div className="p-1.5 rounded-full bg-primary/20 text-primary mt-0.5 flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-foreground font-medium leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Product Reviews */}
        <ProductReviews reviews={reviews} averageRating={4.9} totalReviews={14} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              You May Also <span className="text-primary">Like</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  id={relProduct.id}
                  slug={relProduct.slug}
                  name={relProduct.name}
                  brand={relProduct.brand}
                  images={relProduct.image || relProduct.images}
                  originalPrice={relProduct.original_price}
                  discountedPrice={relProduct.discounted_price}
                  categoryName={relProduct.category_name}
                  onViewDetails={(slug) => router.push(`/product/${slug}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal Popup */}
      <SharePopup
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        productName={product.name}
      />
    </div>
  );
}
