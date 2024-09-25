import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import partService from "./partService";
import { RootState } from "../../app/store";
import { PartInterface } from "../../features/inventory/Part";

/**
 * Represents the state for parts in the inventory application.
 * 
 * @interface PartState
 * @property {PartInterface[]} parts - An array of parts.
 * @property {PartInterface | null} part - A single part or null.
 * @property {boolean} isLoading - Indicates if the parts are being loaded.
 * @property {boolean} isError - Indicates if there was an error loading the parts.
 * @property {boolean} isSuccess - Indicates if the parts were successfully loaded.
 * @property {string} message - A message related to the loading state.
 */
interface PartState {
  parts: PartInterface[];
  part: PartInterface | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}


/**
 * The initial state for the part slice.
 * 
 * @typedef {Object} PartState
 * @property {Array} parts - An array to hold the parts.
 * @property {boolean} isLoading - Indicates if the parts are being loaded.
 * @property {boolean} isError - Indicates if there was an error loading the parts.
 * @property {boolean} isSuccess - Indicates if the parts were successfully loaded.
 * @property {string} message - A message related to the loading state.
 * @property {Object|null} part - The currently selected part or null if none is selected.
 */
const initialState: PartState = {
  parts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  part: null,
};

/**
 * Asynchronous thunk action to create a new part.
 * 
 * @param {PartInterface} partData - The data of the part to be created.
 * @param {ThunkAPI} thunkAPI - The thunk API object.
 * @returns {Promise<any>} - The created part data or an error message.
 * 
 * @throws {Error} If the authorization token is missing.
 * 
 * @example
 * dispatch(createPart(partData));
 */
export const createPart = createAsyncThunk(
  "parts/create",
  async (partData: PartInterface, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      if (!token) throw new Error("Authorization token missing.");
      return await partService.createPart(partData, token); 
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Asynchronous thunk action to fetch all parts.
 * 
 * This function uses `createAsyncThunk` to create an asynchronous action that
 * fetches parts from the `partService`. If the request is successful, it returns
 * an array of `PartInterface` objects. If the request fails, it catches the error
 * and returns a rejected action with an error message.
 * 
 * @async
 * @function getParts
 * @returns {Promise<PartInterface[]>} A promise that resolves to an array of parts.
 * @throws {string} An error message if the request fails.
 */
export const getParts = createAsyncThunk<
  PartInterface[],
  void,
  { state: RootState }
>("parts/getAll", async (_, thunkAPI) => {
  try {
    return await partService.getParts();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

/**
 * Asynchronous thunk action to update a part.
 * 
 * @param {PartInterface} partData - The data of the part to be updated.
 * @param {ThunkAPI} thunkAPI - The thunk API provided by Redux Toolkit.
 * 
 * @returns {Promise<any>} - The updated part data or an error message.
 * 
 * @throws {Error} - Throws an error if the authorization token is missing.
 * 
 * @example
 * dispatch(updatePart(partData));
 */
export const updatePart = createAsyncThunk(
  "parts/update",
  async (partData: PartInterface, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      if (!token) throw new Error("Authorization token missing.");
      return await partService.updatePart(partData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Asynchronous thunk action to lookup a part by its ID.
 * 
 * @param {string} partId - The ID of the part to lookup.
 * @param {Object} thunkAPI - The thunk API object.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * @returns {Promise<PartInterface>} - A promise that resolves to the part data.
 * 
 * @throws {Error} If the authorization token is missing.
 * @throws {Error} If the request fails, the error message is returned.
 */
export const lookupPartById = createAsyncThunk<PartInterface, string, { state: RootState }>(
  "parts/lookupById",
  async (partId, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      if (!token) throw new Error("Authorization token missing.");
      return await partService.lookupPartById(partId, token);
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
 * Asynchronous thunk action to lookup parts by name.
 * 
 * @param {string} name - The name of the part to lookup.
 * @param {Object} thunkAPI - The thunk API object.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * @returns {Promise<PartInterface[]>} - A promise that resolves to an array of parts matching the given name.
 * 
 * @throws {Error} If the authorization token is missing.
 * @throws {string} If an error occurs during the lookup, the error message is returned.
 */
export const lookupPartByName = createAsyncThunk<PartInterface[], string, { state: RootState }>(
  "parts/lookupByName",
  async (name, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      if (!token) throw new Error("Authorization token missing.");
      return await partService.lookupPartByName(name, token);
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
 * Asynchronous thunk action to delete a part.
 * 
 * @param {string} partId - The ID of the part to be deleted.
 * @param {Object} thunkAPI - The thunk API object.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * @returns {Promise<void>} - A promise that resolves when the part is deleted.
 * 
 * @throws {Error} If the authorization token is missing or if the deletion fails.
 */
export const deletePart = createAsyncThunk<void, string, { state: RootState }>(
  "parts/delete",
  async (partId, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;
      if (!token) throw new Error("Authorization token missing.");
      return await partService.deletePart(partId, token);
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
 * Slice for managing parts state in the inventory application.
 * 
 * @module partSlice
 * 
 * @description
 * This slice handles the state related to parts, including loading states, success states,
 * error states, and messages. It also manages the parts data and individual part data.
 * 
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers for the slice.
 * @property {Function} reducers.reset - Resets the state to its initial values.
 * @property {Function} extraReducers - Handles additional actions for the slice.
 */
const partSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
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
        state.parts.push(action.payload);
      })
      .addCase(createPart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getParts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getParts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parts = action.payload;
      })
      .addCase(getParts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Lookup part by ID
      .addCase(lookupPartById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(lookupPartById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.part = action.payload;
      })
      .addCase(lookupPartById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Lookup part by name
      .addCase(lookupPartByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(lookupPartByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parts = action.payload;
      })
      .addCase(lookupPartByName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Delete part
      .addCase(deletePart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parts = state.parts.filter((part) => part._id !== action.meta.arg);
      })
      .addCase(deletePart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Update part
      .addCase(updatePart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.parts.findIndex((part) => part._id === action.payload._id);
        if (index !== -1) {
          state.parts[index] = action.payload;
        }
      })
      .addCase(updatePart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = partSlice.actions;
export default partSlice.reducer;
