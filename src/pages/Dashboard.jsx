import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { reset, getBookings } from "../features/bookingSlice";
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {bookings, isLoading, isError, isSuccess, message} = useSelector((state)=>state.booking)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            console.log(bookings)
        }
        dispatch(reset())
    }, [isError, isSuccess, bookings, message, navigate, dispatch])

    const fetchBookings = () => {
        dispatch(getBookings())
    }
}

export default Dashboard;