import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const token = localStorage.getItem("token");

const initialState = {
    token: token ? token : "",
    bookings: [],
    isLoading: false,
    isError: null,
    isSuccess: false,
    message: '',
};

export const getBookings = createAsyncThunk(
    "booking/getBookings",
    async (token, thunkAPI) => {
        try {
            return await bookingService.getBookings(token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = null;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookings = action.payload;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                state.message = action.isError.message;
            });
    }
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;