function Booking({ bookings }) {
    return (
        <div>
            <h1>Your Bookings</h1>
            {bookings && bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id}>
                            <h3>{booking.company.name}</h3>
                            <p>{booking.bookDate}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
}

export default Booking;