import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';
import { RootState } from '../../app/store';
import { ProductInterface } from '../inventory/Product';

/**
 * Represents the state of the product feature in the application.
 * 
 * @interface ProductState
 * @property {ProductInterface[]} products - An array of products.
 * @property {ProductInterface | null} product - A single product or null if not selected.
 * @property {boolean} isLoading - Indicates if the product data is currently being loaded.
 * @property {boolean} isError - Indicates if there was an error in loading the product data.
 * @property {boolean} isSuccess - Indicates if the product data was successfully loaded.
 * @property {string} message - A message related to the product state, typically used for error or success messages.
 */
interface ProductState {
  products: ProductInterface[];
  product: ProductInterface | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

/**
 * The initial state for the product slice.
 * 
 * @typedef {Object} ProductState
 * @property {Array} products - An array to hold the list of products.
 * @property {Object|null} product - The currently selected product or null if none is selected.
 * @property {boolean} isLoading - A flag indicating if the product data is currently being loaded.
 * @property {boolean} isError - A flag indicating if there was an error in loading the product data.
 * @property {boolean} isSuccess - A flag indicating if the product data was successfully loaded.
 * @property {string} message - A message string to hold any relevant messages or errors.
 */
const initialState: ProductState = {
  products: [],
  product: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

/**
 * Asynchronous thunk action for creating a new product.
 * 
 * @param {ProductInterface} productData - The data of the product to be created.
 * @param {ThunkAPI} thunkAPI - The thunk API object.
 * @returns {Promise<any>} - A promise that resolves with the created product data or rejects with an error message.
 * 
 * @throws Will throw an error if the product creation fails.
 */
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

/**
 * Asynchronous thunk action to fetch all products.
 * 
 * This function uses `createAsyncThunk` to create an asynchronous action that
 * fetches products from the server. It retrieves the authentication token from
 * the Redux state and passes it to the `productService.getProducts` function.
 * If an error occurs during the fetch, it extracts the error message and rejects
 * the thunk with the message.
 * 
 * @function
 * @async
 * @param {void} _ - Unused parameter.
 * @param {Object} thunkAPI - The thunk API object provided by Redux Toolkit.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * @returns {Promise<ProductInterface[]>} - A promise that resolves to an array of products.
 * @throws {string} - The error message if the fetch fails.
 */
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

/**
 * Async thunk action to update a product.
 * 
 * @param {ProductInterface} productData - The data of the product to be updated.
 * @param {ThunkAPI} thunkAPI - The thunk API object.
 * @returns {Promise<any>} - The updated product data or an error message.
 * 
 * @throws Will throw an error if the update operation fails.
 */
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

/**
 * Asynchronous thunk action to lookup a product by its ID.
 * 
 * @param {string} productId - The ID of the product to lookup.
 * @param {Object} thunkAPI - The thunk API object.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * 
 * @returns {Promise<ProductInterface>} - A promise that resolves to the product data.
 * 
 * @throws {string} - An error message if the lookup fails.
 */
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

/**
 * Asynchronous thunk action to lookup products by name.
 * 
 * This function dispatches an asynchronous request to the product service to 
 * retrieve a list of products that match the given name. It uses the Redux 
 * Toolkit's `createAsyncThunk` to handle the asynchronous logic and state 
 * management.
 * 
 * @param {string} name - The name of the product to lookup.
 * @param {Object} thunkAPI - The thunk API object provided by Redux Toolkit.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * 
 * @returns {Promise<ProductInterface[]>} A promise that resolves to an array of 
 * products matching the given name.
 * 
 * @throws Will throw an error if the request fails, with the error message 
 * extracted from the response or the error object.
 */
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

/**
 * Asynchronous thunk action to delete a product.
 * 
 * @async
 * @function deleteProduct
 * @param {string} productId - The ID of the product to be deleted.
 * @param {Object} thunkAPI - The thunk API object.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * @returns {Promise<void>} - A promise that resolves when the product is deleted.
 * @throws Will throw an error if the deletion fails.
 */
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

/**
 * Slice for managing product-related state in the inventory application.
 * 
 * @module productSlice
 * 
 * @description
 * This slice handles the state for product operations including creating, 
 * fetching, updating, and deleting products. It also supports looking up 
 * products by ID and name.
 * 
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - The synchronous reducers for the slice.
 * @property {Function} reducers.reset - Resets the state to its initial values.
 * @property {Function} extraReducers - The asynchronous reducers for the slice.
 */
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
