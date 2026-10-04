export interface Product {
  id: string;
  product_id: string;
  slug: string;
  name: string;
  brand: string;
  varient_label?: string;
  image: string;
  images: string;
  images_list?: string[];
  category: string;
  category_id?: string;
  category_name?: string;
  color?: string;
  frame?: string;
  gears?: string;
  brakes?: string;
  tire_size?: string;
  weight?: string;
  original_price: number;
  discounted_price: number;
  discount_percent: number;
  discount?: number;
  stock: number;
  featured: boolean;
  location?: string;
  tags?: string;
  age_group?: string;
  short_description?: string;
  long_description?: string;
  description?: string;
  specifications?: any;
  features?: any;
  currentPrice?: number;
  rating?: number;
  reviews?: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  frame_size?: string;
  available_sizes?: string[];
  available_colors?: string[];
  variants?: ProductVariant[];
  variant_group_id?: string;
}

export interface ProductVariant {
  id: string;
  product_id?: string;
  slug?: string;
  name?: string;
  varient_label?: string;
  color?: string;
  color_hex?: string;
  size?: string;
  frame_size?: string;
  tire_size?: string;
  brakes?: string;
  gears?: string;
  original_price?: number;
  discounted_price?: number;
  image?: string;
  stock?: number;
}

export interface Category {
  id?: string;
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface ProductCardProps {
  id: string;
  slug?: string;
  name: string;
  brand?: string;
  images?: string;
  originalPrice: number;
  discountedPrice: number;
  categoryName?: string;
  ageGroup?: string;
  discount?: number;
  onViewDetails?: (idOrSlug: string) => void;
}
