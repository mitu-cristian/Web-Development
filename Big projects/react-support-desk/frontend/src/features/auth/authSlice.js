import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const register = createAsyncThunk("/auth/register", async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    }
    catch(error) {
        const message = error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk("/auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    }
    catch (error) {
        const message = error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {    
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
            },
        logout: (state) => {
            localStorage.removeItem("user");
            state.user = null;
        }
        
    },
    extraReducers: (builder) => {
        builder
        // Register
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
        // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
    }
})

export const selectAuthSlice = (state) => state.auth;
export const {reset, logout} = authSlice.actions;
export default authSlice.reducer;