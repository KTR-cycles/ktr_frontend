import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { AGE_GROUP_OPTIONS } from "@/constants/ageGroups";
import { PATHS } from "@/components/path";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_AGES_SENTINEL = "_all_ages";

export default function AgeGroupShopNav() {
  const [, setLocation] = useLocation();
  const { PRODUCTS } = PATHS;

  const navigateToAge = (value: string) => {
    setLocation(`${PRODUCTS}?age_group=${encodeURIComponent(value)}`);
  };

  const navigateToAll = () => {
    setLocation(PRODUCTS);
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 md:mb-3">
          Shop by age
        </p>

        {/* Mobile: dropdown */}
        <div className="md:hidden">
          <Select
            onValueChange={(v) => {
              if (v === ALL_AGES_SENTINEL) navigateToAll();
              else navigateToAge(v);
            }}
          >
            <SelectTrigger className="h-12 w-full rounded-xl border-border/60 bg-white/90 text-base font-medium shadow-sm">
              <SelectValue placeholder="Choose an age group" />
            </SelectTrigger>
            <SelectContent position="popper" className="rounded-xl z-50">
              <SelectItem value={ALL_AGES_SENTINEL} className="rounded-lg">
                All ages
              </SelectItem>
              {AGE_GROUP_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="rounded-lg"
                >
                  {opt.homeLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Desktop / tablet: pill row */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-2 lg:gap-3">
          {AGE_GROUP_OPTIONS.map((opt, index) => (
            <motion.button
              key={opt.value}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="px-4 py-2.5 rounded-full text-sm font-semibold border border-border/60 bg-white/90 text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md transition-all"
              onClick={() => navigateToAge(opt.value)}
            >
              {opt.homeLabel}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
