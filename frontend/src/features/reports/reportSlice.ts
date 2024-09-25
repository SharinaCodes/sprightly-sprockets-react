import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportService from './reportService';
import { RootState } from '../../app/store';

/**
 * Represents the state for reports in the application.
 * 
 * @interface ReportState
 * @property {any} partsReport - The report data for parts.
 * @property {any} productsReport - The report data for products.
 * @property {any} usersReport - The report data for users.
 * @property {boolean} isLoading - Indicates if the report data is currently being loaded.
 * @property {boolean} isError - Indicates if there was an error loading the report data.
 * @property {boolean} isSuccess - Indicates if the report data was successfully loaded.
 * @property {string} message - A message associated with the report state, typically used for error or success messages.
 */
interface ReportState {
  partsReport: any; 
  productsReport: any;
  usersReport: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

/**
 * The initial state for the report slice.
 * 
 * @typedef {Object} ReportState
 * @property {any | null} partsReport - The report data for parts, initially null.
 * @property {any | null} productsReport - The report data for products, initially null.
 * @property {any | null} usersReport - The report data for users, initially null.
 * @property {boolean} isLoading - Indicates if the report data is currently being loaded.
 * @property {boolean} isError - Indicates if there was an error loading the report data.
 * @property {boolean} isSuccess - Indicates if the report data was successfully loaded.
 * @property {string} message - A message related to the report loading state, initially an empty string.
 */
const initialState: ReportState = {
  partsReport: null,
  productsReport: null,
  usersReport: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

/**
 * Fetches the parts timestamp report.
 * 
 * This function is an asynchronous thunk action that retrieves the parts timestamp report
 * from the report service. It uses the authentication token from the Redux state to make
 * the request. If the token is missing, it throws an error. If the request fails, it 
 * returns a rejected action with an error message.
 * 
 * @async
 * @function fetchPartsTimestampReport
 * @param {Object} _ - Unused parameter.
 * @param {Object} thunkAPI - The thunk API object provided by Redux Toolkit.
 * @returns {Promise<any>} The parts timestamp report data.
 * @throws {Error} If the authentication token is missing.
 */
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

/**
 * Asynchronous thunk action to fetch the products timestamp report.
 * 
 * This action retrieves the products timestamp report from the report service.
 * It requires an authentication token, which is obtained from the Redux state.
 * If the token is missing, an error is thrown.
 * 
 * @async
 * @function fetchProductsTimestampReport
 * @param {void} _ - Unused parameter.
 * @param {Object} thunkAPI - The thunk API object provided by Redux Toolkit.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * @param {Function} thunkAPI.rejectWithValue - Function to return a rejected action with a value.
 * @returns {Promise<Object>} The products timestamp report data.
 * @throws {Error} If the authentication token is missing or if an error occurs during the fetch.
 */
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

/**
 * Asynchronous thunk action to fetch the users' timestamp report.
 * 
 * This function uses the `createAsyncThunk` utility from Redux Toolkit to create an asynchronous action.
 * It retrieves the authentication token from the state and uses it to request the users' timestamp report
 * from the `reportService`. If the token is missing or an error occurs during the request, it handles the
 * error and returns a rejected action with an appropriate error message.
 * 
 * @function fetchUsersTimestampReport
 * @async
 * @param {Object} _ - Unused parameter.
 * @param {Object} thunkAPI - The thunk API object provided by Redux Toolkit.
 * @returns {Promise<Object>} The users' timestamp report data or an error message.
 * @throws {Error} If the authentication token is missing or the request fails.
 */
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

/**
 * Slice for handling report-related state and actions.
 * 
 * @module reportSlice
 * 
 * @description
 * This slice manages the state for generating and handling reports, including parts, products, and users reports.
 * It includes actions for resetting the state and handling the asynchronous fetching of reports.
 * 
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - Synchronous reducers to handle state changes.
 * @property {Function} reducers.reset - Resets the state to its initial values.
 * @property {Function} extraReducers - Handles asynchronous actions related to fetching reports.
 */
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
