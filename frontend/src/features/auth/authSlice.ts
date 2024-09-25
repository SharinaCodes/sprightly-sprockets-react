import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { RootState } from '../../app/store';

// Define the User interface
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

// Define the state interface for auth
interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Get user from localStorage if available
const user: User | null = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

// Define the initial state for auth
const initialState: AuthState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};


/**
 * Asynchronous thunk action for registering a new user.
 *
 * @param {Object} userData - The user data for registration.
 * @param {string} userData.firstName - The first name of the user.
 * @param {string} userData.lastName - The last name of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the user account.
 * @param {Object} thunkAPI - The thunk API object.
 * @returns {Promise<User>} The registered user data.
 * @throws Will throw an error if registration fails.
 */
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { firstName: string; lastName: string; email: string; password: string }, thunkAPI) => {
    try {
      const response: User = await authService.register(userData);
      return response;
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
 * Asynchronous thunk action for logging in a user.
 * 
 * @param {Object} userData - The user data containing email and password.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @param {Object} thunkAPI - The thunk API object.
 * 
 * @returns {Promise<User>} The logged-in user data.
 * 
 * @throws Will throw an error if the login fails.
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response: User = await authService.login(userData);
      return response;
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
 * Asynchronous thunk action to log out the current user.
 * 
 * This action calls the `authService.logout` method to log out the user.
 * If the logout is successful, it returns `null` to indicate that no user is logged in.
 * If an error occurs during the logout process, it rejects the action with a failure message.
 * 
 * @async
 * @function logoutUser
 * @param {Object} _ - Unused parameter.
 * @param {Object} thunkAPI - The thunk API object provided by Redux Toolkit.
 * @returns {Promise<null | string>} A promise that resolves to `null` if logout is successful, 
 * or rejects with a failure message if an error occurs.
 */
export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await authService.logout();
    return null;  // Return null to indicate no user is logged in
  } catch (error: any) {
    return thunkAPI.rejectWithValue('Failed to logout');
  }
});

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
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
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // Assign the user payload to state.user
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // Assign the user payload to state.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = true;
      });
  },
});

// Export actions and reducer
export const { reset } = authSlice.actions;
export default authSlice.reducer;

// Selectors for auth state
export const selectAuthState = (state: RootState): AuthState => state.auth;
export const selectUser = (state: RootState): User | null => state.auth.user;
