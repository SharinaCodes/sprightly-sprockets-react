import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportService from './reportService';
import { RootState } from '../../app/store';

// Define the state interface for reports
interface ReportState {
  partsReport: any; // You can replace `any` with a specific type if needed
  productsReport: any;
  usersReport: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

// Initial state
const initialState: ReportState = {
  partsReport: null,
  productsReport: null,
  usersReport: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Fetch Parts Creation/Modification Report
export const fetchPartsTimestampReport = createAsyncThunk(
  'reports/fetchPartsTimestampReport',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;

      if (!token) {
        throw new Error('Authentication token is missing');
      }

      return await reportService.getPartsTimestampReport(token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch Products Creation/Modification Report
export const fetchProductsTimestampReport = createAsyncThunk(
  'reports/fetchProductsTimestampReport',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;

      if (!token) {
        throw new Error('Authentication token is missing');
      }

      return await reportService.getProductsTimestampReport(token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch Users Creation/Modification Report
export const fetchUsersTimestampReport = createAsyncThunk(
  'reports/fetchUsersTimestampReport',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.user?.token;

      if (!token) {
        throw new Error('Authentication token is missing');
      }

      return await reportService.getUsersTimestampReport(token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Report slice
const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.partsReport = null;
      state.productsReport = null;
      state.usersReport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Parts Report
      .addCase(fetchPartsTimestampReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPartsTimestampReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.partsReport = action.payload;
      })
      .addCase(fetchPartsTimestampReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Products Report
      .addCase(fetchProductsTimestampReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsTimestampReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productsReport = action.payload;
      })
      .addCase(fetchProductsTimestampReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Users Report
      .addCase(fetchUsersTimestampReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsersTimestampReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.usersReport = action.payload;
      })
      .addCase(fetchUsersTimestampReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = reportSlice.actions;
export default reportSlice.reducer;
