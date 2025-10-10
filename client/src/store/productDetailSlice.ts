import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types';
import { fetchProductById } from '../lib/api';

interface ProductDetailState {
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  selectedProduct: null,
  loading: false,
  error: null,
};

// Async thunk to fetch product by ID
export const fetchProductDetail = createAsyncThunk(
  'productDetail/fetch',
  async (productId: string, { rejectWithValue }) => {
    try {
      const product = await fetchProductById(productId);
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product details');
    }
  }
);

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    // Set product directly (when navigating from product card)
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.error = null;
    },
    // Clear product details
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct } = productDetailSlice.actions;
export default productDetailSlice.reducer;

