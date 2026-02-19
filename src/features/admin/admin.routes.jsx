import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminPandit from "./AdminPandit";
import AdminPuja from "./AdminPuja";
import AdminAudit from "./AdminAudit";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="orders" element={<AdminOrders />} />
      <Route path="pandit" element={<AdminPandit />} />
      <Route path="puja" element={<AdminPuja />} />
      <Route path="audit" element={<AdminAudit />} />
    </Routes>
  );
}
