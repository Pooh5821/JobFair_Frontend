import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { reset, getBookings } from "../features/booking/bookingSlice";
import { useNavigate } from 'react-router-dom'
import Booking from "../components/Booking";

function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {token, bookings = [], isLoading, isError, isSuccess, message} = useSelector((state)=>state.booking)

    console.log(token)
    console.log(bookings)

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
            dispatch(getBookings(token));
        }
    }, [dispatch, token]);

    return (
        <div>
            <h1>Dashboard</h1>
            <Booking bookings={Array(bookings)} />
        </div>
    );
}

export default Dashboard;