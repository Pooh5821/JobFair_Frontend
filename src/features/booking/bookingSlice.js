import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
    token: '',
    booking: [],
    loading: false,
    error: null,
    success: false,
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
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookings.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.booking = action.payload;
            })
            .addCase(getBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = action.error.message;
            });
    }
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;