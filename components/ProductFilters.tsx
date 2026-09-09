"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface FilterOptions {
  categories: { id: string; name: string }[];
  brands: string[];
  priceRange: [number, number];
}

export interface ProductFiltersProps {
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
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    (priceRange[0] !== options.priceRange[0] || priceRange[1] !== options.priceRange[1] ? 1 : 0);

  const toggleCategory = (categoryId: string) => {
    const next = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(next);
  };

  const toggleBrand = (brand: string) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    onBrandChange(next);
  };

  const filterContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          Filter Cycles
        </h3>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs text-muted-foreground hover:text-primary">
            Clear all ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="space-y-3">
        <button
          className="flex items-center justify-between w-full font-medium text-sm text-foreground"
          onClick={() => setExpandedSections((prev) => ({ ...prev, categories: !prev.categories }))}
        >
          <span>Categories ({options.categories.length})</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections.categories && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {options.categories.map((cat) => (
              <div key={cat.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${cat.id}`}
                  checked={selectedCategories.includes(cat.id)}
                  onCheckedChange={() => toggleCategory(cat.id)}
                />
                <Label htmlFor={`cat-${cat.id}`} className="text-sm font-normal cursor-pointer flex-1">
                  {cat.name}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brands Filter */}
      <div className="space-y-3 pt-4 border-t border-border">
        <button
          className="flex items-center justify-between w-full font-medium text-sm text-foreground"
          onClick={() => setExpandedSections((prev) => ({ ...prev, brands: !prev.brands }))}
        >
          <span>Brands ({options.brands.length})</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections.brands && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {options.brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer flex-1">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 pt-4 border-t border-border">
        <button
          className="flex items-center justify-between w-full font-medium text-sm text-foreground"
          onClick={() => setExpandedSections((prev) => ({ ...prev, price: !prev.price }))}
        >
          <span>Price Range</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections.price && (
          <div className="space-y-4 pt-2">
            <Slider
              min={options.priceRange[0]}
              max={options.priceRange[1]}
              step={500}
              value={priceRange}
              onValueChange={(val) => onPriceChange(val as [number, number])}
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground font-medium">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Button
        variant="outline"
        className="lg:hidden rounded-full flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Filter className="w-4 h-4" />
        Filters
        {activeFilterCount > 0 && (
          <Badge className="ml-1 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-xs bg-background h-full p-6 overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-4">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              {filterContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden lg:block w-64 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-border/50 shadow-lg">
          {filterContent}
        </div>
      )}
    </>
  );
}
