import { Routes, Route, Navigate } from "react-router-dom";
import OrderList from "./OrderList";
import CreateOrder from "./CreateOrder";
import OrderDetail from "./OrderDetail";

export default function OrderRoutes() {
  return (
    <Routes>
      <Route index element={<OrderList />} />
      <Route path="list" element={<OrderList />} />
      <Route path="create" element={<CreateOrder />} />
      <Route path=":id" element={<OrderDetail />} />
      <Route path="*" element={<Navigate to="/user/order" replace />} />
    </Routes>
  );
}
