"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { EMAIL_ID, email_url } from "@/utils/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-accent/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/assets/generated_images/ktr_cycle_logo.jpg" 
                alt="KTR Cycle World Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-foreground">
                KTR <span className="text-primary">Cycle World</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your premium destination for high-quality cycles. Two wheels, endless adventures.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" data-testid="link-footer-home" onClick={scrollToTop}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products" data-testid="link-footer-products" onClick={scrollToTop}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about" data-testid="link-footer-about" onClick={scrollToTop}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="link-footer-contact" onClick={scrollToTop}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors" onClick={scrollToTop}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors" onClick={scrollToTop}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Nainar kulam road, Tirunelveli, Tamil Nadu, India - 627006
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919342727735" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 9342727735
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={email_url} className="text-muted-foreground hover:text-primary transition-colors">
                  {EMAIL_ID}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {currentYear} KTR Cycle World. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
