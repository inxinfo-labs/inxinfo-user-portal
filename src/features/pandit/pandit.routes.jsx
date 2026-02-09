import { Routes, Route, Navigate } from "react-router-dom";
import PanditList from "./PanditList";
import BookPandit from "./BookPandit";
import PanditBookings from "./PanditBookings";
import PanditBookingPayment from "./PanditBookingPayment";

export default function PanditRoutes() {
  return (
    <Routes>
      <Route index element={<PanditList />} />
      <Route path="list" element={<PanditList />} />
      <Route path=":id/book" element={<BookPandit />} />
      <Route path="bookings" element={<PanditBookings />} />
      <Route path="booking/:bookingId/pay" element={<PanditBookingPayment />} />
      <Route path="*" element={<Navigate to="/user/pandit" replace />} />
    </Routes>
  );
}
