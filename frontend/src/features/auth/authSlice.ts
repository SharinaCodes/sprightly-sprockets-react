import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

//Define the initial state using that type
interface AuthState {
    user: string | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: AuthState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {}
})

export default authSlice.reducer