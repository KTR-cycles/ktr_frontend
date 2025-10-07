import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
}

interface ProductFiltersProps {
  options: FilterOptions;
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  onCategoryChange: (categories: string[]) => void;
  onBrandChange: (brands: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearAll: () => void;
}

export default function ProductFilters({
  options,
  selectedCategories,
  selectedBrands,
  priceRange,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onClearAll,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      // On desktop, always keep filters open
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandChange(selectedBrands.filter((b) => b !== brand));
    } else {
      onBrandChange([...selectedBrands, brand]);
    }
  };

  const activeFiltersCount =
    selectedCategories.length + selectedBrands.length + (priceRange[0] !== options.priceRange[0] || priceRange[1] !== options.priceRange[1] ? 1 : 0);

  return (
    <div className="lg:sticky lg:top-20">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Filters</h3>
            {activeFiltersCount > 0 && (
              <Badge className="rounded-full">{activeFiltersCount}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-muted-foreground hover:text-foreground rounded-xl"
                data-testid="button-clear-filters"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden rounded-xl"
              data-testid="button-toggle-filters"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {(isOpen || !isMobile) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div>
                  <button
                    onClick={() => toggleSection("categories")}
                    className="w-full flex items-center justify-between mb-4 hover-elevate active-elevate-2 p-2 rounded-xl transition-all"
                    data-testid="button-toggle-categories"
                  >
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Categories</h4>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        expandedSections.categories ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections.categories && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-3 overflow-hidden"
                      >
                        {options.categories.map((category) => (
                          <div key={category} className="flex items-center gap-3">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => handleCategoryToggle(category)}
                              data-testid={`checkbox-category-${category}`}
                            />
                            <Label
                              htmlFor={`category-${category}`}
                              className="text-xs sm:text-sm text-foreground cursor-pointer flex-1"
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-t border-border pt-6">
                  <button
                    onClick={() => toggleSection("brands")}
                    className="w-full flex items-center justify-between mb-4 hover-elevate active-elevate-2 p-2 rounded-xl transition-all"
                    data-testid="button-toggle-brands"
                  >
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Brands</h4>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        expandedSections.brands ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections.brands && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-3 overflow-hidden"
                      >
                        {options.brands.map((brand) => (
                          <div key={brand} className="flex items-center gap-3">
                            <Checkbox
                              id={`brand-${brand}`}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={() => handleBrandToggle(brand)}
                              data-testid={`checkbox-brand-${brand}`}
                            />
                            <Label
                              htmlFor={`brand-${brand}`}
                              className="text-xs sm:text-sm text-foreground cursor-pointer flex-1"
                            >
                              {brand}
                            </Label>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="border-t border-border pt-6">
                  <button
                    onClick={() => toggleSection("price")}
                    className="w-full flex items-center justify-between mb-4 hover-elevate active-elevate-2 p-2 rounded-xl transition-all"
                    data-testid="button-toggle-price"
                  >
                    <h4 className="text-sm sm:text-base font-semibold text-foreground">Price Range</h4>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        expandedSections.price ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections.price && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <Slider
                          min={options.priceRange[0]}
                          max={options.priceRange[1]}
                          step={1000}
                          value={priceRange}
                          onValueChange={(value) => onPriceChange(value as [number, number])}
                          className="w-full"
                          data-testid="slider-price-range"
                        />
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-foreground font-medium">
                            ₹{priceRange[0].toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">to</span>
                          <span className="text-foreground font-medium">
                            ₹{priceRange[1].toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
