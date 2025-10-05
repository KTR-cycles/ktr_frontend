import FeaturedProducts from '../FeaturedProducts';
import bikeImage from '@assets/generated_images/Premium_golden_bike_product_18205e52.png';

export default function FeaturedProductsExample() {
  const products = [
    {
      id: "1",
      name: "Mountain Explorer Pro 29",
      brand: "KTR Sports",
      image: bikeImage,
      actualPrice: 45000,
      discount: 20,
      currentPrice: 36000,
      category: "Mountain Bike"
    },
    {
      id: "2",
      name: "City Cruiser Elite",
      brand: "KTR Urban",
      image: bikeImage,
      actualPrice: 28000,
      discount: 15,
      currentPrice: 23800,
      category: "City Bike"
    },
    {
      id: "3",
      name: "Road Racer X1",
      brand: "KTR Performance",
      image: bikeImage,
      actualPrice: 55000,
      discount: 10,
      currentPrice: 49500,
      category: "Road Bike"
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
