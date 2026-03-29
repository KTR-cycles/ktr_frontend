import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from '@assets/generated_images/ktr_cycle_logo.jpg';
import { motion, AnimatePresence } from "framer-motion";
import { AGE_GROUP_OPTIONS } from "@/constants/ageGroups";
import { PATHS } from "@/components/path";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToShowroom = () => {
    // Close mobile menu if open
    setMobileMenuOpen(false);
    
    // Navigate to home page if not already there
    if (location !== "/") {
      window.location.href = "/#showroom-map";
    } else {
      // Scroll to the map section
      const mapSection = document.getElementById("showroom-map");
      if (mapSection) {
        mapSection.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }
    }
  };

  // Handle hash navigation when component mounts or location changes
  useEffect(() => {
    const handleHashNavigation = () => {
      if (location === "/" && window.location.hash === "#showroom-map") {
        // Small delay to ensure the page has loaded
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
  }, [location]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-lg border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div 
              className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-xl transition-all cursor-pointer"
              onClick={scrollToTop}
            >
              <img 
                src={logo} 
                alt="KTR Cycle World - Best Cycles in Tirunelveli, Vannarpettai & Palayankottai" 
                className="w-8 h-6 sm:w-10 sm:h-8 md:w-12 md:h-10 object-contain"
                title="KTR Cycle World - Leading Cycle Shop in South Tamil Nadu"
              />
              <span className="text-sm sm:text-base md:text-xl font-bold text-foreground">
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
                  onClick={scrollToTop}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border/80 gap-1 font-medium"
                  data-testid="button-shop-by-age"
                >
                  Shop by age
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl z-50">
                {AGE_GROUP_OPTIONS.map((opt) => (
                  <DropdownMenuItem key={opt.value} asChild className="rounded-lg cursor-pointer">
                    <Link
                      href={`${PATHS.PRODUCTS}?age_group=${encodeURIComponent(opt.value)}`}
                      onClick={scrollToTop}
                    >
                      {opt.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
                <p className="px-4 pt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Shop by age
                </p>
                {AGE_GROUP_OPTIONS.map((opt) => (
                  <Link
                    key={opt.value}
                    href={`${PATHS.PRODUCTS}?age_group=${encodeURIComponent(opt.value)}`}
                    data-testid={`link-mobile-age-${opt.value.replace("+", "plus")}`}
                  >
                    <div
                      className="block px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollToTop();
                      }}
                    >
                      {opt.label}
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
