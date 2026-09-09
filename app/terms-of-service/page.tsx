"use client";

import { Package, Truck, Award, Shield } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Showroom guidelines and terms for purchasing bicycles at KTR Cycle World
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-8 border rounded-2xl border-border/50 bg-white/80 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Package className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Product Availability</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-13">
              All products listed on our website or showroom catalog are subject to availability. We strive to keep our catalog inventory up to date, but items may sell out in store.
            </p>
          </div>

          <div className="p-8 border rounded-2xl border-border/50 bg-white/80 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Pricing & Discounts</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-13">
              Prices and discount offers displayed on the catalog are subject to change without prior notice. Final confirmed price is established at showroom purchase.
            </p>
          </div>

          <div className="p-8 border rounded-2xl border-border/50 bg-white/80 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Delivery & Showroom Pickup</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-13">
              We offer local delivery and doorstep pickup services across Tirunelveli, Vannarpettai, and Palayankottai areas.
            </p>
          </div>

          <div className="p-8 border rounded-2xl border-border/50 bg-white/80 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Quality Assurance</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-13">
              All bicycles sold by KTR Cycle World undergo rigorous assembly and safety inspections prior to delivery.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/contact" className="text-primary hover:underline font-semibold cursor-pointer">
            Questions regarding our terms? Contact KTR Cycle World
          </Link>
        </div>
      </div>
    </div>
  );
}
