"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa6";
import { EMAIL_ID, email_url } from "@/utils/config";
import { STORE_LOCATIONS } from "@/data/storeLocations";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/ktr_cycleworld_tirunelveli",
      icon: FaInstagram,
      label: "Visit KTR Cycle World on Instagram",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/ktrcycleworld",
      icon: FaFacebook,
      label: "Visit KTR Cycle World on Facebook",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@ktrcycleworld",
      icon: FaYoutube,
      label: "Visit KTR Cycle World on YouTube",
    },
  ];

  return (
    <footer className="bg-accent/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/assets/generated_images/ktr_cycle_logo.jpg" 
                alt="KTR Cycle World Logo" 
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-heading font-black text-foreground">
                KTR <span className="text-primary font-black">Cycle World</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Your premium destination for high-quality bicycles across South Tamil Nadu. 4 Showrooms to serve you best!
            </p>
            <div className="flex items-center gap-2 flex-wrap" aria-label="Social media profiles">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border/80 text-muted-foreground hover:text-white hover:bg-primary hover:border-primary transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" data-testid="link-footer-home" onClick={scrollToTop}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products" data-testid="link-footer-products" onClick={scrollToTop}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about" data-testid="link-footer-about" onClick={scrollToTop}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="link-footer-contact" onClick={scrollToTop}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" data-testid="link-footer-privacy" onClick={scrollToTop}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" data-testid="link-footer-terms" onClick={scrollToTop}>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                    Terms of Service
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-foreground mb-4">Our Showrooms</h3>
            <ul className="space-y-2 text-sm">
              {STORE_LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{loc.branchName}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground/60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919342727735" className="text-muted-foreground hover:text-primary transition-colors font-medium">
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
              © {currentYear} KTR Cycle World. All rights reserved. Operating 4 showrooms in Tirunelveli Town, Samathanapuram, Kayathar & Kalakkad.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms-of-service" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
