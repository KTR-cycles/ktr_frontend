import FeaturedProducts from '../FeaturedProducts';
import bikeImage from '@assets/generated_images/Premium_golden_bike_product_18205e52.png';

export default function FeaturedProductsExample() {
  const products = [
    {
      id: "1",
      name: "Mountain Explorer Pro 29",
      brand: "KTR Sports",
      image: bikeImage,
      original_price: 45000,
      discounted_price: 36000,
      currentPrice: 36000,
      category_name: "Mountain Bike"
    },
    {
      id: "2",
      name: "City Cruiser Elite",
      brand: "KTR Urban",
      image: bikeImage,
      original_price: 28000,
      discounted_price: 23800,
      currentPrice: 23800,
      category_name: "City Bike"
    },
    {
      id: "3",
      name: "Road Racer X1",
      brand: "KTR Performance",
      image: bikeImage,
      original_price: 55000,
      discounted_price: 49500,
      currentPrice: 49500,
      category_name: "Road Bike"
    },
  ];

  return (
    <FeaturedProducts
      products={products}
      onViewDetails={(id) => console.log('View product:', id)}
      onViewAll={() => console.log('View all products')}
    />
  );
}
