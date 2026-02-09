import { Routes, Route, Navigate } from "react-router-dom";
import UserHome from "./UserHome";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UploadProfilePic from "./UploadProfilePic";
import SearchPage from "../search/SearchPage";
import MyActivity from "./MyActivity";
import CartPage from "../cart/CartPage";
import BookPage from "../book/BookPage";

export default function UserRoutes() {
  return (
    <Routes>
      <Route index element={<UserHome />} />
      <Route path="home" element={<UserHome />} />
      <Route path="book" element={<BookPage />} />
      <Route path="activity" element={<MyActivity />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/update" element={<UpdateProfile />} />
      <Route path="profile/pic" element={<UploadProfilePic />} />
      <Route path="*" element={<Navigate to="/user/home" replace />} />
    </Routes>
  );
}
