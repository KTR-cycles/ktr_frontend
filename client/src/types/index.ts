export interface Product {
  id: string;
  product_id: string;
  name: string;
  brand: string;
  image: string;
  images: string;
  category: string;
  category_id?: string;
  category_name?: string;
  age_group?: string;
  color: string;
  original_price: number;
  discounted_price: number;
  discount_percent: number;
  discount?: number;
  stock: number;
  featured: boolean;
  location: string;
  short_description: string;
  long_description: string;
  description?: string;
  tags: string;
  varient_label: string;
  specifications?: string;
  features?: string;
  currentPrice?: number;
  rating?: number;
  reviews?: number;
}

export interface Category {
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface HeroSlide {
  image: string;
  quote?: string; // nullable — omit for image-only slides
  author?: string;
}

export interface MotivationQuote {
  text: string;
}

export type BenefitIcon = 'heart' | 'zap' | 'smile' | 'trending' | 'users' | 'leaf';

export interface CyclingBenefit {
  icon: BenefitIcon;
  title: string;
  description: string;
}

export type ServiceIcon = 'delivery' | 'pickup' | 'quality' | 'experience';

export interface HomeService {
  icon: ServiceIcon;
  title: string;
  description: string;
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
