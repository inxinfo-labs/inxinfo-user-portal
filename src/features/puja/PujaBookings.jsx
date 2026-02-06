import { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner, Badge } from "react-bootstrap";
import api from "../../services/api";

export default function PujaBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/puja/bookings");
      setBookings(response.data.data);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      PENDING: "warning",
      CONFIRMED: "success",
      IN_PROGRESS: "info",
      COMPLETED: "primary",
      CANCELLED: "danger",
    };
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">My Puja Bookings</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {bookings.length === 0 ? (
        <Alert variant="info">No bookings found</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Puja Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.pujaType?.name}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.bookingTime}</td>
                <td>₹{booking.totalAmount}</td>
                <td>{getStatusBadge(booking.status)}</td>
                <td>{booking.address}, {booking.city}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
