import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/bookings";

// Get all bookings
const getBookings = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
}

const bookingService = {
  getBookings,
};

export default bookingService;