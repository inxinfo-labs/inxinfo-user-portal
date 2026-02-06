import { Routes, Route, Navigate } from "react-router-dom";
import PujaList from "./PujaList";
import BookPuja from "./BookPuja";
import PujaBookings from "./PujaBookings";

export default function PujaRoutes() {
  return (
    <Routes>
      <Route index element={<PujaList />} />
      <Route path="list" element={<PujaList />} />
      <Route path=":id/book" element={<BookPuja />} />
      <Route path="bookings" element={<PujaBookings />} />
      <Route path="*" element={<Navigate to="/user/puja" replace />} />
    </Routes>
  );
}
