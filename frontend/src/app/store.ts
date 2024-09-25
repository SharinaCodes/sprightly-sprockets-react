
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import partReducer from '../features/parts/partSlice';
import produtReducer from '../features/products/productSlice';
import reportReducer from '../features/reports/reportSlice';


/**
 * Configures and exports the Redux store for the application.
 * 
 * The store combines multiple reducers to manage different slices of the state:
 * - `auth`: Manages authentication-related state using `authReducer`.
 * - `part`: Manages part-related state using `partReducer`.
 * - `product`: Manages product-related state using `produtReducer`.
 * - `report`: Manages report-related state using `reportReducer`.
 * 
 * @module store
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    part: partReducer,
    product: produtReducer,
    report: reportReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
