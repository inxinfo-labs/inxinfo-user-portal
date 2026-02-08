import { Routes, Route } from "react-router-dom";
import ProductsList from "./ProductsList";

export default function ProductsRoutes() {
  return (
    <Routes>
      <Route index element={<ProductsList />} />
    </Routes>
  );
}
