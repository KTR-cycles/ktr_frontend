import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Heart, Share2, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import ProductReviews from "@/components/ProductReviews";
import { fetchProductById } from "@/lib/api";

export default function ProductDetail() {
  const [match, params] = useRoute("/products/:id");
  const productId = params?.id || "";

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['/api/products', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  });

  const reviews = [
    {
      id: "1",
      userName: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent cycle! Perfect for mountain trails. The build quality is outstanding and it handles rough terrain beautifully.",
      date: "2 weeks ago",
      helpful: 12
    },
    {
      id: "2",
      userName: "Priya Sharma",
      rating: 4,
      comment: "Great value for money. Comfortable ride and smooth gears. Only minor issue is the seat could be more cushioned.",
      date: "1 month ago",
      helpful: 8
    },
    {
      id: "3",
      userName: "Amit Patel",
      rating: 5,
      comment: "Best purchase ever! I've been cycling daily for 3 months now. The performance is consistent and maintenance is minimal.",
      date: "3 months ago",
      helpful: 15
    },
  ];

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
          <Link href="/products">
            <Button variant="default" className="rounded-full">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.split(',').map(img => img.trim());
  const specifications = product.specifications
    ? product.specifications.split('\n').map(line => {
        const [label, value] = line.split(':').map(s => s.trim());
        return { label: label || '', value: value || '' };
      }).filter(spec => spec.label && spec.value)
    : [];
  
  const features = product.features
    ? product.features.split('\n').filter(f => f.trim())
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap"
        >
          <Link href="/">
            <a className="hover:text-primary transition-colors" data-testid="link-breadcrumb-home">Home</a>
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products">
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
              <div className="flex items-start justify-between mb-2">
                {product.category && (
                  <Badge className="rounded-full mb-3">{product.category}</Badge>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full" data-testid="button-wishlist">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" data-testid="button-share">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              {product.brand && (
                <p className="text-sm text-muted-foreground font-medium mb-2">{product.brand}</p>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg p-6">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-4xl font-bold text-primary" data-testid="text-current-price">
                  ₹{product.currentPrice.toLocaleString()}
                </span>
                {product.discount && product.discount > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through" data-testid="text-original-price">
                      ₹{product.actualPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-chart-2 text-white rounded-full px-3 py-1 text-sm font-bold" data-testid="badge-discount">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              {product.discount && product.discount > 0 && (
                <p className="text-sm text-chart-2 font-medium">
                  You save ₹{(product.actualPrice - product.currentPrice).toLocaleString()}
                </p>
              )}
            </div>

            {product.description && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">Description</h2>
                <p className="text-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 rounded-full"
                data-testid="button-enquire-now"
                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Enquire Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8"
                data-testid="button-visit-showroom"
              >
                Visit Showroom
              </Button>
            </div>
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
                <h2 className="text-2xl font-bold text-foreground mb-6">Specifications</h2>
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
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
                  {features.map((feature, index) => (
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
        >
          <ProductReviews reviews={reviews} averageRating={4.7} totalReviews={156} />
        </motion.div>
      </div>
    </div>
  );
}
