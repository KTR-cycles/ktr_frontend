"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import CategoryCarousel from "./CategoryCarousel";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => pathname === href;

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToShowroom = () => {
    setMobileMenuOpen(false);
    if (pathname !== "/") {
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
  };

  useEffect(() => {
    const handleHashNavigation = () => {
      if (pathname === "/" && window.location.hash === "#showroom-map") {
        setTimeout(() => {
          const mapSection = document.getElementById("showroom-map");
          if (mapSection) {
            mapSection.scrollIntoView({ 
              behavior: "smooth",
              block: "start"
            });
          }
        }, 100);
      }
    };

    handleHashNavigation();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-lg border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 md:px-6" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home" onClick={scrollToTop}>
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-xl transition-all cursor-pointer">
              <img 
                src="/assets/generated_images/ktr_cycle_logo.jpg" 
                alt="KTR Cycle World - Best Cycles in Tirunelveli, Vannarpettai & Palayankottai" 
                className="w-8 h-6 sm:w-10 sm:h-8 md:w-12 md:h-10 object-contain"
                title="KTR Cycle World - Leading Cycle Shop in South Tamil Nadu"
              />
              <span className="text-base sm:text-lg md:text-xl font-heading font-black tracking-tight text-foreground">
                KTR <span className="text-primary font-black">Cycle World</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase()}`}>
                <div
                  className={`px-4 py-2 rounded-xl font-semibold text-sm tracking-wide transition-all hover-elevate active-elevate-2 cursor-pointer ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10 font-bold"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={scrollToTop}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <Button 
              variant="default" 
              size="default" 
              className="ml-4 rounded-full" 
              onClick={scrollToShowroom}
              data-testid="button-visit-showroom"
            >
              Visit Showroom
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} data-testid={`link-mobile-${link.label.toLowerCase()}`}>
                    <div
                      className={`block px-4 py-3 rounded-xl font-medium transition-all hover-elevate active-elevate-2 cursor-pointer ${
                        isActive(link.href)
                          ? "text-primary bg-primary/10"
                          : "text-foreground"
                      }`}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollToTop();
                      }}
                    >
                      {link.label}
                    </div>
                  </Link>
                ))}
                <Button
                  variant="default"
                  size="default"
                  className="w-full rounded-full mt-2"
                  onClick={scrollToShowroom}
                  data-testid="button-visit-showroom-mobile"
                >
                  Visit Showroom
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export function HomePageCategoryCarousel() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <CategoryCarousel />;
}
