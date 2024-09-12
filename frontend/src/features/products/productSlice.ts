import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';
import { RootState } from '../../app/store';
import { ProductInterface } from '../inventory/Product';

// Define the state interface for parts
interface ProductState {
  products: ProductInterface[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

// Initial state
const initialState: ProductState = {
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Async thunk for creating a part
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData: ProductInterface, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      return await productService.createProduct(productData, token!);  // Ensure token is non-null
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all products
export const getProducts = createAsyncThunk<ProductInterface[], void, { state: RootState }>(
  'products/getAll',
  async (_, thunkAPI) => {
    
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      return await productService.getProducts(token!);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload as ProductInterface); // Add the newly created part to the list
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
