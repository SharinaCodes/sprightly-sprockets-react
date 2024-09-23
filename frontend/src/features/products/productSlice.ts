import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';
import { RootState } from '../../app/store';
import { ProductInterface } from '../inventory/Product';

// Define the state interface for products
interface ProductState {
  products: ProductInterface[];
  product: ProductInterface | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

// Initial state
const initialState: ProductState = {
  products: [],
  product: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Async thunk for creating a product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData: ProductInterface, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      return await productService.createProduct(productData, token!); // Ensure token is non-null
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for getting all products
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

// Async thunk for updating a product
export const updateProduct = createAsyncThunk(
  'products/update',
  async (productData: ProductInterface, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      return await productService.updateProduct(productData, token!); // Ensure token is non-null
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for looking up a product by ID
export const lookupProductById = createAsyncThunk<ProductInterface, string, { state: RootState }>(
  'products/lookupById',
  async (productId, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      return await productService.lookupProductById(productId, token!);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for looking up a product by name
export const lookupProductByName = createAsyncThunk<ProductInterface[], string, { state: RootState }>(
  'products/lookupByName',
  async (name, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      return await productService.lookupProductByName(name, token!);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for deleting a product by ID
export const deleteProduct = createAsyncThunk<void, string, { state: RootState }>(
  'products/delete',
  async (productId, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      return await productService.deleteProduct(productId, token!);
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
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Get products
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
      })

      // Lookup product by ID
      .addCase(lookupProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(lookupProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(lookupProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Lookup product by Name
      .addCase(lookupProductByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(lookupProductByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload; // Replace products with the search results
      })
      .addCase(lookupProductByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // Find index of the updated product
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );

        // If the product exists, update it
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally, remove the deleted product from state
        state.products = state.products.filter(
          (product) => product._id !== action.meta.arg
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
