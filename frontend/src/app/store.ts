import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import partReducer from '../features/parts/partSlice';
import produtReducer from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    part: partReducer,
    product: produtReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
