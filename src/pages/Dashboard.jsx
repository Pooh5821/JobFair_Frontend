import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { reset, getBookings } from "../features/booking/bookingSlice";
import { useNavigate } from 'react-router-dom'
import Booking from "../components/Booking";

function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {bookings, isLoading, isError, isSuccess, message} = useSelector((state)=>state.booking)
    const {token} = useSelector((state)=>state.auth?.token)

    console.log(token)

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        dispatch(reset())
    }, [isError, isSuccess, bookings, message, navigate, dispatch])

    useEffect(() => {
        if (token) {
            console.log(token)
            dispatch(getBookings(token));
        }
    }, [dispatch, token]);

    return (
        <div>
            <h1>Dashboard</h1>
            <Booking bookings={bookings} />
        </div>
    );
}

export default Dashboard;