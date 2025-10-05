import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Category } from '@shared/schema';
import axios from 'axios';

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null,
};

const CATEGORIES_API = 'https://script.google.com/macros/s/AKfycbwoX23d_uxE5brVKm3KZTXRzlM4Pq4PBAv9DIdDI_dPITtkcsTfROfitO65t4pKC1AN/exec?sheet=categories';

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(CATEGORIES_API);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;
