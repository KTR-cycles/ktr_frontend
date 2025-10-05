import ProductCard from '../ProductCard';
import bikeImage from '@assets/generated_images/Premium_golden_bike_product_18205e52.png';

export default function ProductCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ProductCard
        id="1"
        name="Mountain Explorer Pro 29"
        brand="KTR Sports"
        image={bikeImage}
        originalPrice={45000}
        discountedPrice={36000}
        categoryName="Mountain Bike"
        onViewDetails={(id) => console.log('View details for product:', id)}
      />
    </div>
  );
}
