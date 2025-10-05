import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/90 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-xl transition-all cursor-pointer">
              <Bike className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                KTR <span className="text-primary">Cycle World</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase()}`}>
                <div
                  className={`px-4 py-2 rounded-xl font-medium transition-all hover-elevate active-elevate-2 cursor-pointer ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <Button variant="default" size="default" className="ml-4 rounded-full" data-testid="button-visit-showroom">
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
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </div>
                  </Link>
                ))}
                <Button
                  variant="default"
                  size="default"
                  className="w-full rounded-full mt-2"
                  onClick={() => setMobileMenuOpen(false)}
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
