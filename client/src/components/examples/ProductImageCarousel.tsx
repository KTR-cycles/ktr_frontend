import ProductImageCarousel from '../ProductImageCarousel';
import bikeImage from '@assets/generated_images/Premium_golden_bike_product_18205e52.png';

export default function ProductImageCarouselExample() {
  const images = [bikeImage, bikeImage, bikeImage, bikeImage];

  return (
    <div className="p-8 max-w-2xl">
      <ProductImageCarousel images={images} productName="Mountain Explorer Pro 29" />
    </div>
  );
}
