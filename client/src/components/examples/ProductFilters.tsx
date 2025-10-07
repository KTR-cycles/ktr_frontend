import { useState } from 'react';
import ProductFilters from '../ProductFilters';

export default function ProductFiltersExample() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([10000, 100000]);

  const options = {
    categories: [
      { id: '1', name: 'Mountain Bike' },
      { id: '2', name: 'Road Bike' },
      { id: '3', name: 'City Bike' },
      { id: '4', name: 'Electric Bike' },
      { id: '5', name: 'Kids Bike' },
    ],
    brands: ['KTR Sports', 'KTR Urban', 'KTR Performance', 'KTR Electric', 'KTR Junior'],
    priceRange: [10000, 100000] as [number, number],
  };

  return (
    <div className="p-8 max-w-sm">
      <ProductFilters
        options={options}
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        priceRange={priceRange}
        onCategoryChange={setSelectedCategories}
        onBrandChange={setSelectedBrands}
        onPriceChange={setPriceRange}
        onClearAll={() => {
          setSelectedCategories([]);
          setSelectedBrands([]);
          setPriceRange([10000, 100000]);
        }}
      />
    </div>
  );
}
