import { createSlice } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
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
        reset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = '';
        },
    },
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;