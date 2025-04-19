import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import { getBookings } from '../features/bookingSlice'

function Booking() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state)=>state.auth)
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect to login if user is not authenticated
        } else {
            dispatch(getBookings(user.token))
                .then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        setBookings(response.payload);
                    } else {
                        console.error('Failed to fetch bookings:', response.error.message);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching bookings:', error);
                });
        }
    }, [user, navigate])

    return (
        <div>
            <h1>Your Bookings</h1>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id}>
                            <h3>{booking.title}</h3>
                            <p>{booking.description}</p>
                            <p>{booking.company.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
}