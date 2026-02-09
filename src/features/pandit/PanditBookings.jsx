import { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function PanditBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/pandit/bookings");
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
      <h2 className="mb-4">My Pandit Bookings</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {bookings.length === 0 ? (
        <Alert variant="info">No bookings found</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Pandit Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.pandit?.name}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.startTime} - {booking.endTime}</td>
                <td>{booking.durationHours} hour(s)</td>
                <td>₹{booking.totalAmount}</td>
                <td>{getStatusBadge(booking.status)}</td>
                <td>{booking.address}, {booking.city}</td>
                <td>
                  {booking.status === "PENDING" && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/user/pandit/booking/${booking.id}/pay`)}
                    >
                      Pay Now
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
