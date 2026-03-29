import axios from 'axios';
import type { Product } from '../types';
import { PRODUCTS_URL, FEEDBACK_SENDER_URL } from '../utils/config';

const PRODUCTS_API = PRODUCTS_URL;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(PRODUCTS_API);
    
    if (response.data && response.data.length > 0) {
      console.log('Sample product from API:', JSON.stringify(response.data[0], null, 2));
    }
    
    return response.data.map((item: any, index: number) => {
      // Use product_id as primary identifier, fallback to index-based ID
      const productId = String(item.product_id || item.id || `product-${index + 1}`);
      
      return {
        id: productId,
        product_id: productId,
        name: item.name || '',
        brand: item.brand || '',
        image: item.images ? item.images.split(',')[0].trim() : '',
        images: item.images || '',
        category: item.category || '',
        category_id: item.category,
        category_name: item.category_name || '',
        age_group: item.age_group ? String(item.age_group).trim() : '',
        color: item.color || '',
        original_price: Number(item.original_price || 0),
        discounted_price: Number(item.discounted_price || 0),
        discount_percent: Number(item.discount_percent || 0),
        discount: Number(item.discount_percent || 0),
        stock: Number(item.stock || 0),
        featured: Boolean(item.featured),
        location: item.location || '',
        short_description: item.short_description || '',
        long_description: item.long_description || '',
        description: item.long_description || item.short_description || '',
        tags: item.tags || '',
        varient_label: item.varient_label || '',
        specifications: item.specifications || '',
        features: item.features || '',
        currentPrice: Number(item.discounted_price || 0),
      };
    });
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



// Send feedback/contact form
export interface FeedbackData {
  username: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

export const sendFeedback = async (data: FeedbackData): Promise<any> => {
  try {
    // Format body as expected by backend
    const body = `Name: ${data.username}
Email: ${data.email}
Phone: ${data.phone}
Country: ${data.country}
Message:
${data.message}`;

    // Send as JSON payload
    const payload = {
      username: data.username,
      email: data.email,
      phone: data.phone,
      country: data.country,
      message: data.message,
      body: body
    };
 
    const response = await fetch(FEEDBACK_SENDER_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
    });

    // Note: no-cors mode doesn't allow reading the response
    // We'll assume success if no error is thrown
    return { success: true };
  } catch (error: any) {
    console.error('Error sending feedback:', error);
    throw new Error(error.message || 'Failed to send feedback');
  }
};