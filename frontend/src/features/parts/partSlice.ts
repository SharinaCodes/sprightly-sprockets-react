// partSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import partService from './partService';
import { RootState } from '../../app/store'; // Make sure this points to the correct location
import { PartInterface } from '../../features/inventory/Part'; // Import the correct Part type

// Define the state interface for parts
interface PartState {
  parts: PartInterface[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

// Initial state
const initialState: PartState = {
  parts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Async thunk for creating a part
export const createPart = createAsyncThunk(
  'parts/create',
  async (partData: PartInterface, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      return await partService.createPart(partData, token!);  // Ensure token is non-null
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Part slice
const partSlice = createSlice({
  name: 'parts',
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
      .addCase(createPart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parts.push(action.payload); // Add the newly created part to the list
      })
      .addCase(createPart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = partSlice.actions;
export default partSlice.reducer;
