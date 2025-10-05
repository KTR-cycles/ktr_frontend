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
        actualPrice={45000}
        discount={20}
        currentPrice={36000}
        category="Mountain Bike"
        onViewDetails={(id) => console.log('View details for product:', id)}
      />
    </div>
  );
}
