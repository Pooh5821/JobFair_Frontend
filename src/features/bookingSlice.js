import { createSlice } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
    user: user? user : null,
    booking: null,
    loading: false,
    error: null,
    success: false,
    message: '',
};

export const getBookings = async () => {
    try {
        return await bookingService.getBookings(token);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
}

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        bookingRequest: (state) => {
            state.loading = true;
        },
        bookingSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.booking = action.payload;
        },
        bookingFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {reset} = bookingSlice.actions;
export default bookingSlice.reducer;