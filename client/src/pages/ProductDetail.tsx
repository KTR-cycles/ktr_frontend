
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { useState } from "react";
import { ChevronRight, Share2, ShoppingCart, Loader2, Package, Shield, Truck, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import SharePopup from "@/components/SharePopup";
import { useAppSelector } from "@/store/hooks";
import { PATHS } from "@/components/path";
import { whatsapp_url } from "@/utils/config";

export default function ProductDetail() {
  const { PRODUCTS, PRODUCT_DETAIL, HOME, CONTACT } = PATHS;
  const [match] = useRoute(PRODUCT_DETAIL);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const { selectedProduct: product, loading: isLoading, error } = useAppSelector(
    (state) => state.productDetail
  );

  console.log("Hello", product);
  const isError = !!error;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Product not found</p>
          <Link href={PRODUCTS}>
            <Button variant="default" className="rounded-full">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images ? product.images.split(',').map((img: string) => img.trim()) : [product.image];
  const specifications = product.specifications
    ? product.specifications.split('\n').map((line: string) => {
        const [label, value] = line.split(':').map((s: string) => s.trim());
        return { label: label || '', value: value || '' };
      }).filter((spec: { label: string; value: string }) => spec.label && spec.value)
    : [];
  
  const features = product.features
    ? product.features.split('\n').filter((f: string) => f.trim())
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap"
        >
          <Link href={HOME}>
            <a className="hover:text-primary transition-colors" data-testid="link-breadcrumb-home">Home</a>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={PRODUCTS}>
            <a className="hover:text-primary transition-colors" data-testid="link-breadcrumb-products">Products</a>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{product.name}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductImageCarousel images={images} productName={product.name} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {product.varient_label && (
                    <Badge className="rounded-full" variant="secondary">{product.varient_label}</Badge>
                  )}
                  {Number(product?.stock) >= 1 ? (
                    <Badge className="rounded-full bg-green-500/10 text-green-700 border-green-500/20" data-testid="badge-in-stock">
                      In Stock
                    </Badge>
                  ) : (
                    <Badge className="rounded-full bg-red-500/10 text-red-700 border-red-500/20" data-testid="badge-out-of-stock">
                      Out of Stock
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge className="rounded-full bg-amber-500/10 text-amber-700 border-amber-500/20">
                      Featured
                    </Badge>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full" 
                  data-testid="button-share"
                  onClick={() => setIsShareOpen(true)}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
              {product.brand && (
                <p className="text-sm text-muted-foreground font-medium mb-2">{product.brand}</p>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              {product.color && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Color:</span>
                  <span className="text-sm font-medium text-foreground">{product.color}</span>
                </div>
              )}
              {product.location && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="text-sm font-medium text-foreground">{product.location}</span>
                </div>
              )}
            </div>

            {product.original_price === product.discounted_price ? (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg p-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-4xl font-bold text-primary" data-testid="text-discounted-price">
                    ₹{product.discounted_price.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg p-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-4xl font-bold text-primary" data-testid="text-discounted-price">
                    ₹{product.discounted_price.toLocaleString()}
                  </span>
                  <span className="text-xl text-muted-foreground line-through" data-testid="text-original-price">
                    ₹{product.original_price.toLocaleString()}
                  </span>
                  {product.discount && product.discount > 0 && (
                    <Badge className="bg-chart-2 text-white rounded-full px-3 py-1 text-sm font-bold" data-testid="badge-discount">
                      {product.discount}% OFF
                    </Badge>
                  )}
                </div>
                {product.discount && product.discount > 0 && (
                  <p className="text-sm text-chart-2 font-medium">
                    You save ₹{(product.original_price - product.discounted_price).toLocaleString()}
                  </p>
                )}
              </div>
            )}

            {(product.short_description || product.long_description) && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-border/30 p-6">
                <h2 className="text-xl font-semibold text-foreground mb-3">Product Description</h2>
                {product.short_description && (
                  <p className="text-foreground leading-relaxed mb-3">{product.short_description}</p>
                )}
                {product.long_description && product.long_description !== product.short_description && (
                  <p className="text-foreground leading-relaxed text-sm text-muted-foreground">{product.long_description}</p>
                )}
              </div>
            )}

            {product.tags && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                {product.tags.split(',').map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="rounded-full">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            )}

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Why Choose Us?</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Quality Assured</p>
                    <p className="text-xs text-muted-foreground">100% Authentic</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Fast Delivery</p>
                    <p className="text-xs text-muted-foreground">Pan India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">Hassle-free</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">24/7 Support</p>
                    <p className="text-xs text-muted-foreground">Expert Help</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full rounded-full text-lg py-6"
              data-testid="button-enquire-now"
              onClick={() => window.open(whatsapp_url, '_blank') as any}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Enquire Now on WhatsApp
            </Button>
          </motion.div>
        </div>

        {(specifications.length > 0 || features.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {specifications.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Technical Specifications</h2>
                <div className="space-y-4">
                  {specifications.map((spec: { label: string; value: string }, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between py-3 border-b border-border last:border-b-0"
                      data-testid={`spec-${index}`}
                    >
                      <span className="text-muted-foreground font-medium">{spec.label}</span>
                      <span className="text-foreground font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {features.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
                <ul className="space-y-3">
                  {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3" data-testid={`feature-${index}`}>
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contact us now to learn more about this product or visit our showroom for a hands-on experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full px-8"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  window.location.href = "/#showroom-map";
                } else {
                  const mapSection = document.getElementById("showroom-map");
                  if (mapSection) {
                    mapSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    });
                  }
                }
              }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Visit Our Showroom
            </Button>
            <Link href={CONTACT}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Share Popup */}
      <SharePopup
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        productName={product.name}
      />
    </div>
  );
}
