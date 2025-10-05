import axios from 'axios';
import type { Product } from '@shared/schema';

const PRODUCTS_API = 'https://script.google.com/macros/s/AKfycbwoX23d_uxE5brVKm3KZTXRzlM4Pq4PBAv9DIdDI_dPITtkcsTfROfitO65t4pKC1AN/exec?sheet=products';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(PRODUCTS_API);
    return response.data.map((item: any) => ({
      id: String(item.id || item.ID || item.Id),
      name: item.name || item.Name || '',
      brand: item.brand || item.Brand || '',
      category_name: item.category_name || item.category || item.Category || '',
      type: item.type || item.Type || '',
      original_price: Number(item.original_price || item.actualPrice || item.actual_price || 0),
      discount: Number(item.discount || item.Discount || 0),
      discounted_price: Number(item.discounted_price || item.currentPrice || item.current_price || 0),
      description: item.description || item.Description || '',
      specifications: item.specifications || item.Specifications || '',
      features: item.features || item.Features || '',
      images: item.images || item.Images || '',
      stock: item.stock || item.Stock || 'In Stock',
    }));
  } catch (error: any) {
    console.error('Error fetching products:', error);
    throw new Error(error.message || 'Failed to fetch products');
  }
};

let cachedProducts: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const now = Date.now();
  if (!cachedProducts || now - cacheTimestamp > CACHE_DURATION) {
    cachedProducts = await fetchProducts();
    cacheTimestamp = now;
  }
  return cachedProducts.find((p) => p.id === id) || null;
};
