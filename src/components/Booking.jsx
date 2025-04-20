function Booking({ bookings = [] }) {
    // Flatten all booking entries from each .data array
    const allBookings = bookings.flatMap(item => item.data || []);

    if (allBookings.length === 0) {
        return (
            <div>
                <h1>Your Bookings</h1>
                <p>No bookings found.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Your Bookings</h1>
            <ul>
                {allBookings.map((booking) => (
                    <li key={booking.id}>
                        <h3>{booking.company?.name}</h3>
                        <p>{new Date(booking.bookDate).toLocaleString('en-US', { timeZone: 'UTC' })}</p>
                        <p>-------------------------------------</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Booking;