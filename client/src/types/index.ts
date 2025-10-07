export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  original_price: number;
  discounted_price: number;
  currentPrice: number;
  category_id?: string;
  category_name: string;
  category?: string;
  images?: string;
  specifications?: string;
  features?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
}

export interface Category {
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  currentPrice: number;
  categoryName?: string;
  category?: string;
  onViewDetails: (id: string) => void;
}
