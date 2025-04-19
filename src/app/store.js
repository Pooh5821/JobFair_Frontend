import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../features/booking/bookingSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    auth: authReducer,
  },
});