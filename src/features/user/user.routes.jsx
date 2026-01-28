import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UploadProfilePic from "./UploadProfilePic";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="profile" element={<Profile />} />
      <Route path="profile/update" element={<UpdateProfile />} />
      <Route path="profile/pic" element={<UploadProfilePic />} />
    </Routes>
  );
}
